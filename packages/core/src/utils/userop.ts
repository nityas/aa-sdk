import type { EntryPointVersion } from "../entrypoint/types";
import type {
  BigNumberish,
  Multiplier,
  UserOperationFeeOptionsField,
  UserOperationOverrides,
  UserOperationRequest,
  UserOperationStruct,
  UserOperationStruct_v6,
  UserOperationStruct_v7,
} from "../types";
import { bigIntClamp, bigIntMultiply } from "./bigint.js";
import { allEqual, isBigNumberish } from "./index.js";

/**
 * Utility method for asserting a {@link UserOperationStruct} has valid fields for the given entry point version
 *
 * @param request a {@link UserOperationStruct} to validate
 * @returns a type guard that asserts the {@link UserOperationRequest} is valid
 */
export function isValidRequest<TEntryPointVersion extends EntryPointVersion>(
  request: UserOperationStruct<TEntryPointVersion>
): request is UserOperationRequest<TEntryPointVersion> {
  // These are the only ones marked as optional in the interface above
  return (
    BigInt(request.callGasLimit || 0n) > 0n &&
    BigInt(request.maxFeePerGas || 0n) > 0n &&
    BigInt(request.preVerificationGas || 0n) > 0n &&
    BigInt(request.verificationGasLimit || 0n) > 0n &&
    request.maxPriorityFeePerGas != null &&
    isValidPaymasterAndData(request) &&
    isValidFactoryAndData(request)
  );
}

/**
 * Utility method for asserting a {@link UserOperationRequest} has valid fields for the paymaster data
 *
 * @param request a {@link UserOperationRequest} to validate
 * @returns a type guard that asserts the {@link UserOperationRequest} is a {@link UserOperationRequest}
 */
export function isValidPaymasterAndData<
  TEntryPointVersion extends EntryPointVersion
>(request: UserOperationStruct<TEntryPointVersion>): boolean {
  if ("paymasterAndData" in request) {
    return (request as UserOperationStruct_v6).paymasterAndData != null;
  }

  // either all exist, or none.
  return allEqual(
    (request as UserOperationStruct_v7).paymaster == null,
    (request as UserOperationStruct_v7).paymasterData == null,
    (request as UserOperationStruct_v7).paymasterPostOpGasLimit == null,
    (request as UserOperationStruct_v7).paymasterVerificationGasLimit == null
  );
}

/**
 * Utility method for asserting a {@link UserOperationStruct} has valid fields for the paymaster data
 *
 * @param request a {@link UserOperationRequest} to validate
 * @returns a type guard that asserts the {@link UserOperationStruct} is a {@link UserOperationRequest}
 */
export function isValidFactoryAndData<
  TEntryPointVersion extends EntryPointVersion
>(request: UserOperationStruct<TEntryPointVersion>): boolean {
  if ("initCode" in request) {
    const { initCode } = request as UserOperationStruct_v6;
    return initCode != null;
  }

  // either all exist, or none.
  return allEqual(
    (request as UserOperationStruct_v7).factory == null,
    (request as UserOperationStruct_v7).factoryData == null
  );
}

/**
 * Utility method for applying a {@link UserOperationOverrides} field value
 * over the current value set for the field
 *
 * @param value the current value of the field
 * @param override the override value to apply
 * @returns the new value of the field after applying the override
 */
export function applyUserOpOverride(
  value: BigNumberish | undefined,
  override?: BigNumberish | Multiplier
): BigNumberish | undefined {
  if (override == null) {
    return value;
  }

  if (isBigNumberish(override)) {
    return override;
  }

  // multiplier override
  else {
    return value != null ? bigIntMultiply(value, override.multiplier) : value;
  }
}

/**
 * Utility method for applying a {@link UserOperationFeeOptionsField} value
 * over the current value set for the field
 *
 * @param value the current value of the field
 * @param feeOption the fee option field value to apply
 * @returns the new value of the field after applying the fee option
 */
export function applyUserOpFeeOption(
  value: BigNumberish | undefined,
  feeOption?: UserOperationFeeOptionsField
): BigNumberish {
  if (feeOption == null) {
    return value ?? 0n;
  }
  return value != null
    ? bigIntClamp(
        feeOption.multiplier
          ? bigIntMultiply(value, feeOption.multiplier)
          : value,
        feeOption.min,
        feeOption.max
      )
    : feeOption.min ?? 0n;
}

/**
 * Utility method for applying a {@link UserOperationOverrides} field value and
 * a {@link UserOperationFeeOptionsField} value over the current value set for the field,
 * with the override taking precedence over the fee option
 *
 * @param value the current value of the field
 * @param [override] the override value to apply
 * @param [feeOption] the fee option field value to apply
 * @returns the new value of the field after applying the override or fee option
 */
export function applyUserOpOverrideOrFeeOption(
  value: BigNumberish | undefined,
  override?: BigNumberish | Multiplier,
  feeOption?: UserOperationFeeOptionsField
): BigNumberish {
  return value != null && override != null
    ? applyUserOpOverride(value, override)!
    : applyUserOpFeeOption(value, feeOption);
}

/**
 * Utility method for checking whether the middleware pipeline should
 * bypass the paymaster middleware for the user operation with the given overrides
 *
 * @template EntryPointVersion TEntryPointVersion
 * @param overrides the user operation overrides to check
 * @returns whether the paymaster middleware should be bypassed
 */
export const bypassPaymasterAndData = <
  TEntryPointVersion extends EntryPointVersion
>(
  overrides: UserOperationOverrides<TEntryPointVersion> | undefined
): boolean =>
  !!overrides &&
  (("paymasterAndData" in overrides && overrides.paymasterAndData === "0x") ||
    ("paymasterData" in overrides && overrides.paymasterData === "0x"));
