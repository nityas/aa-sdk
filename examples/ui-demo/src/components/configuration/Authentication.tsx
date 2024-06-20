import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { MailIcon } from "../icons/mail"
import { WalletIcon } from "../icons/wallet"
import { SocialIcon } from "../icons/social"
import { BiometricIcon } from "../icons/biometric"

export const Authentication = ({ className }: { className?: string }) => {
  const [emailActive, setEmailActive] = useState(true)
  const [walletsActive, setWalletsActive] = useState(false)
  const [passkeysActive, setPasskeysActive] = useState(false)

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-secondary-foreground text-sm">Auth methods</p>
        <AuthMethod
          icon={<MailIcon />}
          name="Email"
          active={emailActive}
          disabled
        />
        <AuthMethod
          icon={<WalletIcon />}
          name="External wallets"
          active={walletsActive}
          setActive={setWalletsActive}
        />
        <AuthMethod
          icon={<SocialIcon className="opacity-50" />}
          name="Social auth"
          unavailable
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-semibold text-secondary-foreground text-sm">Advanced</p>
        <AuthMethod
          icon={<BiometricIcon />}
          name="Add passkey on signup"
          details={<p className="text-xs font-secondary-foreground">Prompt users to add a passkey after signing up with <span className="font-bold">email</span> or <span className="font-bold">social auth</span></p>}
          active={passkeysActive}
          setActive={setPasskeysActive}
        />
      </div>
    </div>
  )
}

const AuthMethod = ({
  icon,
  name,
  details = null,
  active = false,
  disabled = false,
  unavailable = false,
  setActive,
}: {
  icon: React.ReactNode
  name: string
  details?: React.ReactNode
  active?: boolean
  disabled?: boolean
  unavailable?: boolean
  setActive?: (active: boolean) => void
}) => {
  return (
    <div className="flex items-start border rounded-lg px-4 py-3">
      <div className="mt-1 flex items-center justify-center shrink-0">
        {icon}
      </div>
      
      <div className="ml-2 mr-3 flex flex-col gap-1">
        <p className={cn("font-semibold", unavailable && 'opacity-50')}>
          {name}
        </p>
        {details}
      </div>

      {unavailable ? (
        <div className="ml-auto border border-border/50 px-2 py-1 rounded-sm">
          <p className="text-xs font-semibold">Coming soon</p>
        </div>
      ) : (
        <Switch
          disabled={disabled}
          checked={active}
          onCheckedChange={setActive}
          className="ml-auto"
        />
      )}
    </div>
  )
}