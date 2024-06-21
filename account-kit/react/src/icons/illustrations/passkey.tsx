import { type SVGProps } from "react";
import type { IllustrationProps } from "./types.js";

// eslint-disable-next-line jsdoc/require-jsdoc
export const PasskeyIllustration = ({
  className,
  illustrationStyle: style,
  ...props
}: IllustrationProps) => {
  return (
    <>
      {style === "outline" && (
        <>
          <PasskeyOutlineLight
            className={`dark:hidden ${className ?? ""}`}
            {...props}
          />
          <PasskeyOutlineDark
            className={`hidden dark:block ${className ?? ""}`}
            {...props}
          />
        </>
      )}
      {style === "linear" && (
        <>
          <PasskeyLinearLight
            className={`dark:hidden ${className ?? ""}`}
            {...props}
          />
          <PasskeyLinearDark
            className={`hidden dark:block ${className ?? ""}`}
            {...props}
          />
        </>
      )}
      {style === "filled" && (
        <>
          <PasskeyFilledLight
            className={`dark:hidden ${className ?? ""}`}
            {...props}
          />
          <PasskeyFilledDark
            className={`hidden dark:block ${className ?? ""}`}
            {...props}
          />
        </>
      )}
      {style === "flat" && (
        <>
          <PasskeyFlatLight
            className={`dark:hidden ${className ?? ""}`}
            {...props}
          />
          <PasskeyFlatDark
            className={`hidden dark:block ${className ?? ""}`}
            {...props}
          />
        </>
      )}
    </>
  );
};

const PasskeyOutlineLight = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2554 19.3789C16.2554 13.832 20.752 9.33533 26.2989 9.33533C31.8458 9.33533 36.3425 13.832 36.3425 19.3789C36.3425 24.9258 31.8458 29.4224 26.2989 29.4224C20.752 29.4224 16.2554 24.9258 16.2554 19.3789ZM26.2989 11.1665C21.7634 11.1665 18.0866 14.8433 18.0866 19.3789C18.0866 23.9144 21.7634 27.5912 26.2989 27.5912C30.8345 27.5912 34.5113 23.9144 34.5113 19.3789C34.5113 14.8433 30.8345 11.1665 26.2989 11.1665ZM45.4672 21.9709C42.3183 21.9709 39.7655 24.5236 39.7655 27.6726C39.7655 29.8521 40.9881 31.7474 42.7892 32.7077C43.3189 32.9901 43.7204 33.5513 43.7204 34.2288V45.5282L45.1372 46.9279C45.2302 47.0197 45.3815 47.0135 45.4666 46.9144L47.7592 44.2449C47.8347 44.157 47.8312 44.026 47.751 43.9423L46.9207 43.0746C46.1912 42.3123 46.157 41.1214 46.8416 40.3184L48.7533 38.0761C48.8207 37.9971 48.8253 37.8822 48.7646 37.798L47.099 35.4893C46.3901 34.5065 46.9402 33.2731 47.8483 32.855C49.8101 31.952 51.1689 29.97 51.1689 27.6726C51.1689 24.5236 48.6162 21.9709 45.4672 21.9709ZM37.9343 27.6726C37.9343 23.5123 41.3069 20.1397 45.4672 20.1397C49.6275 20.1397 53.0001 23.5123 53.0001 27.6726C53.0001 30.6986 51.2159 33.306 48.646 34.5037L50.2497 36.7267C50.8041 37.4952 50.7616 38.543 50.1468 39.2642L48.2351 41.5065C48.1601 41.5945 48.1638 41.725 48.2438 41.8085L49.0741 42.6762C49.8056 43.4406 49.8377 44.6353 49.1484 45.438L46.8558 48.1075C46.0791 49.012 44.6984 49.0685 43.8503 48.2306L42.3874 46.7855C42.0686 46.4705 41.8892 46.0411 41.8892 45.593V34.3029C39.536 33.0307 37.9343 30.5394 37.9343 27.6726ZM42.7468 25.5671C42.7468 24.0647 43.9647 22.8467 45.4671 22.8467C46.9695 22.8467 48.1875 24.0647 48.1875 25.5671C48.1875 27.0694 46.9695 28.2874 45.4671 28.2874C43.9647 28.2874 42.7468 27.0694 42.7468 25.5671ZM45.4671 24.6779C44.9761 24.6779 44.578 25.076 44.578 25.5671C44.578 26.0581 44.9761 26.4562 45.4671 26.4562C45.9582 26.4562 46.3562 26.0581 46.3562 25.5671C46.3562 25.076 45.9582 24.6779 45.4671 24.6779ZM7.62319 45.078C9.87583 36.8533 17.1315 30.7889 25.7828 30.7889C30.4839 30.7889 34.7808 32.5836 38.0807 35.5429C38.8177 36.2039 39.1778 37.1426 39.1778 38.0741V45.5866C39.1778 47.5626 37.5759 49.1645 35.5998 49.1645H10.9264C8.83847 49.1645 7.01639 47.2936 7.62319 45.078ZM25.7828 32.6201C18.027 32.6201 11.4433 38.0627 9.38937 45.5618C9.15592 46.4141 9.83332 47.3333 10.9264 47.3333H35.5998C36.5645 47.3333 37.3465 46.5512 37.3465 45.5866V38.0741C37.3465 37.603 37.1653 37.1818 36.858 36.9062C33.8738 34.2299 30.0061 32.6201 25.7828 32.6201Z"
      fill="#363FF9"
    />
  </svg>
);

const PasskeyLinearLight = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="0.3">
      <path
        d="M32.56 32.925C32.56 32.925 17.723 34.3616 16.2871 48.2489H37.3462V37.2348L32.56 32.925Z"
        fill="#363FF9"
      />
      <path
        d="M33.0829 16.098C35.527 18.1777 36.0221 23.0904 33.2893 26.3056C30.5564 29.5207 25.6305 29.8207 23.1864 27.741C20.9411 26.4573 21.4416 21.7648 24.1744 18.5497C26.9072 15.3346 31.1467 14.4505 33.0829 16.098Z"
        fill="#363FF9"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2554 19.3789C16.2554 13.832 20.752 9.33533 26.2989 9.33533C31.8458 9.33533 36.3425 13.832 36.3425 19.3789C36.3425 24.9258 31.8458 29.4224 26.2989 29.4224C20.752 29.4224 16.2554 24.9258 16.2554 19.3789ZM26.2989 11.1665C21.7634 11.1665 18.0866 14.8433 18.0866 19.3789C18.0866 23.9144 21.7634 27.5912 26.2989 27.5912C30.8345 27.5912 34.5113 23.9144 34.5113 19.3789C34.5113 14.8433 30.8345 11.1665 26.2989 11.1665ZM45.4672 21.9709C42.3183 21.9709 39.7655 24.5236 39.7655 27.6726C39.7655 29.8521 40.9881 31.7474 42.7892 32.7077C43.3189 32.9901 43.7204 33.5513 43.7204 34.2288V45.5282L45.1372 46.9279C45.2302 47.0197 45.3815 47.0135 45.4666 46.9144L47.7592 44.2449C47.8347 44.157 47.8312 44.026 47.751 43.9423L46.9207 43.0746C46.1912 42.3123 46.157 41.1214 46.8416 40.3184L48.7533 38.0761C48.8207 37.9971 48.8253 37.8822 48.7646 37.798L47.099 35.4893C46.3901 34.5065 46.9402 33.2731 47.8483 32.855C49.8101 31.952 51.1689 29.97 51.1689 27.6726C51.1689 24.5236 48.6162 21.9709 45.4672 21.9709ZM37.9343 27.6726C37.9343 23.5123 41.3069 20.1397 45.4672 20.1397C49.6275 20.1397 53.0001 23.5123 53.0001 27.6726C53.0001 30.6986 51.2159 33.306 48.646 34.5037L50.2497 36.7267C50.8041 37.4952 50.7616 38.543 50.1468 39.2642L48.2351 41.5065C48.1601 41.5945 48.1638 41.725 48.2438 41.8085L49.0741 42.6762C49.8056 43.4406 49.8377 44.6353 49.1484 45.438L46.8558 48.1075C46.0791 49.012 44.6984 49.0685 43.8503 48.2306L42.3874 46.7855C42.0686 46.4705 41.8892 46.0411 41.8892 45.593V34.3029C39.536 33.0307 37.9343 30.5394 37.9343 27.6726ZM42.7468 25.5671C42.7468 24.0647 43.9647 22.8467 45.4671 22.8467C46.9695 22.8467 48.1875 24.0647 48.1875 25.5671C48.1875 27.0694 46.9695 28.2874 45.4671 28.2874C43.9647 28.2874 42.7468 27.0694 42.7468 25.5671ZM45.4671 24.6779C44.9761 24.6779 44.578 25.076 44.578 25.5671C44.578 26.0581 44.9761 26.4562 45.4671 26.4562C45.9582 26.4562 46.3562 26.0581 46.3562 25.5671C46.3562 25.076 45.9582 24.6779 45.4671 24.6779ZM7.62319 45.078C9.87583 36.8533 17.1315 30.7889 25.7828 30.7889C30.4839 30.7889 34.7808 32.5836 38.0807 35.5429C38.8177 36.2039 39.1778 37.1426 39.1778 38.0741V45.5866C39.1778 47.5626 37.5759 49.1645 35.5998 49.1645H10.9264C8.83847 49.1645 7.01639 47.2936 7.62319 45.078ZM25.7828 32.6201C18.027 32.6201 11.4433 38.0627 9.38937 45.5618C9.15592 46.4141 9.83332 47.3333 10.9264 47.3333H35.5998C36.5645 47.3333 37.3465 46.5512 37.3465 45.5866V38.0741C37.3465 37.603 37.1653 37.1818 36.858 36.9062C33.8738 34.2299 30.0061 32.6201 25.7828 32.6201Z"
      fill="#020617"
    />
  </svg>
);

const PasskeyFilledLight = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.6438 18.9649C35.6438 24.2176 31.3856 28.4757 26.133 28.4757C20.8803 28.4757 16.6222 24.2176 16.6222 18.9649C16.6222 13.7122 20.8803 9.45412 26.133 9.45412C31.3856 9.45412 35.6438 13.7122 35.6438 18.9649ZM48.5791 35.1928C48.2549 34.7434 48.4816 34.1046 48.985 33.8729C51.3548 32.782 53 30.3864 53 27.6065C53 23.7985 49.9131 20.7116 46.1052 20.7116C42.2973 20.7116 39.2104 23.7985 39.2104 27.6065C39.2104 30.2435 40.6908 32.5348 42.8658 33.6945C43.1432 33.8424 43.331 34.1233 43.331 34.4376V46.2784C43.331 46.4902 43.4158 46.6933 43.5665 46.8422L45.0907 48.348C45.581 48.8323 46.3791 48.7996 46.8281 48.2768L49.2169 45.4954C49.6154 45.0314 49.5968 44.3407 49.1739 43.8988L48.3088 42.9948C47.8871 42.5541 47.8673 41.8657 48.263 41.4016L50.2549 39.0652C50.6103 38.6483 50.6349 38.0426 50.3144 37.5984L48.5791 35.1928ZM47.9855 25.4126C47.9855 26.4511 47.1436 27.293 46.1051 27.293C45.0665 27.293 44.2246 26.4511 44.2246 25.4126C44.2246 24.3741 45.0665 23.5322 46.1051 23.5322C47.1436 23.5322 47.9855 24.3741 47.9855 25.4126ZM10.1079 49.0457C8.44426 49.0457 7.14028 47.5808 7.60169 45.9824C9.96469 37.7966 17.5433 31.8075 26.5273 31.8075C31.4128 31.8075 35.8827 33.5786 39.3242 36.5109C39.8989 37.0005 40.2002 37.7303 40.2002 38.4852V46.2718C40.2002 47.8038 38.9583 49.0457 37.4263 49.0457H10.1079Z"
      fill="#363FF9"
    />
  </svg>
);

const PasskeyFlatLight = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.5792 35.1929C48.255 34.7435 48.4817 34.1046 48.9851 33.8729C51.3549 32.782 53.0001 30.3864 53.0001 27.6065C53.0001 23.7986 49.9132 20.7117 46.1053 20.7117C42.2974 20.7117 39.2104 23.7986 39.2104 27.6065C39.2104 30.2435 40.6909 32.5348 42.8659 33.6945C43.1433 33.8424 43.3311 34.1233 43.3311 34.4376V46.2784C43.3311 46.4903 43.4159 46.6933 43.5666 46.8422L45.0908 48.348C45.5811 48.8324 46.3792 48.7997 46.8282 48.2768L49.217 45.4954C49.6155 45.0314 49.5969 44.3408 49.174 43.8989L48.3089 42.9949C47.8872 42.5542 47.8674 41.8658 48.2631 41.4016L50.255 39.0652C50.6104 38.6484 50.635 38.0426 50.3145 37.5984L48.5792 35.1929ZM47.9856 25.4126C47.9856 26.4511 47.1437 27.293 46.1051 27.293C45.0666 27.293 44.2247 26.4511 44.2247 25.4126C44.2247 24.3741 45.0666 23.5322 46.1051 23.5322C47.1437 23.5322 47.9856 24.3741 47.9856 25.4126Z"
      fill="#363FF9"
    />
    <g opacity="0.4">
      <path
        d="M26.133 28.4758C31.3856 28.4758 35.6437 24.2177 35.6437 18.965C35.6437 13.7123 31.3856 9.45422 26.133 9.45422C20.8803 9.45422 16.6222 13.7123 16.6222 18.965C16.6222 24.2177 20.8803 28.4758 26.133 28.4758Z"
        fill="#363FF9"
      />
      <path
        d="M10.1079 49.0457C8.44424 49.0457 7.14026 47.5807 7.60167 45.9823C9.96469 37.7966 17.5433 31.8075 26.5273 31.8075C31.4127 31.8075 35.8826 33.5785 39.3241 36.5108C39.8988 37.0004 40.2001 37.7302 40.2001 38.4851V46.2717C40.2001 47.8037 38.9582 49.0457 37.4261 49.0457H10.1079Z"
        fill="#363FF9"
      />
    </g>
  </svg>
);

const PasskeyOutlineDark = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2554 19.3789C16.2554 13.832 20.752 9.33533 26.2989 9.33533C31.8458 9.33533 36.3425 13.832 36.3425 19.3789C36.3425 24.9258 31.8458 29.4224 26.2989 29.4224C20.752 29.4224 16.2554 24.9258 16.2554 19.3789ZM26.2989 11.1665C21.7634 11.1665 18.0866 14.8433 18.0866 19.3789C18.0866 23.9144 21.7634 27.5912 26.2989 27.5912C30.8345 27.5912 34.5113 23.9144 34.5113 19.3789C34.5113 14.8433 30.8345 11.1665 26.2989 11.1665ZM45.4672 21.9709C42.3183 21.9709 39.7655 24.5236 39.7655 27.6726C39.7655 29.8521 40.9881 31.7474 42.7892 32.7077C43.3189 32.9901 43.7204 33.5513 43.7204 34.2288V45.5282L45.1372 46.9279C45.2302 47.0197 45.3815 47.0135 45.4666 46.9144L47.7592 44.2449C47.8347 44.157 47.8312 44.026 47.751 43.9423L46.9207 43.0746C46.1912 42.3123 46.157 41.1214 46.8416 40.3184L48.7533 38.0761C48.8207 37.9971 48.8253 37.8822 48.7646 37.798L47.099 35.4893C46.3901 34.5065 46.9402 33.2731 47.8483 32.855C49.8101 31.952 51.1689 29.97 51.1689 27.6726C51.1689 24.5236 48.6162 21.9709 45.4672 21.9709ZM37.9343 27.6726C37.9343 23.5123 41.3069 20.1397 45.4672 20.1397C49.6275 20.1397 53.0001 23.5123 53.0001 27.6726C53.0001 30.6986 51.2159 33.306 48.646 34.5037L50.2497 36.7267C50.8041 37.4952 50.7616 38.543 50.1468 39.2642L48.2351 41.5065C48.1601 41.5945 48.1638 41.725 48.2438 41.8085L49.0741 42.6762C49.8056 43.4406 49.8377 44.6353 49.1484 45.438L46.8558 48.1075C46.0791 49.012 44.6984 49.0685 43.8503 48.2306L42.3874 46.7855C42.0686 46.4705 41.8892 46.0411 41.8892 45.593V34.3029C39.536 33.0307 37.9343 30.5394 37.9343 27.6726ZM42.7468 25.5671C42.7468 24.0647 43.9647 22.8467 45.4671 22.8467C46.9695 22.8467 48.1875 24.0647 48.1875 25.5671C48.1875 27.0694 46.9695 28.2874 45.4671 28.2874C43.9647 28.2874 42.7468 27.0694 42.7468 25.5671ZM45.4671 24.6779C44.9761 24.6779 44.578 25.076 44.578 25.5671C44.578 26.0581 44.9761 26.4562 45.4671 26.4562C45.9582 26.4562 46.3562 26.0581 46.3562 25.5671C46.3562 25.076 45.9582 24.6779 45.4671 24.6779ZM7.62319 45.078C9.87583 36.8533 17.1315 30.7889 25.7828 30.7889C30.4839 30.7889 34.7808 32.5836 38.0807 35.5429C38.8177 36.2039 39.1778 37.1426 39.1778 38.0741V45.5866C39.1778 47.5626 37.5759 49.1645 35.5998 49.1645H10.9264C8.83847 49.1645 7.01639 47.2936 7.62319 45.078ZM25.7828 32.6201C18.027 32.6201 11.4433 38.0627 9.38937 45.5618C9.15592 46.4141 9.83332 47.3333 10.9264 47.3333H35.5998C36.5645 47.3333 37.3465 46.5512 37.3465 45.5866V38.0741C37.3465 37.603 37.1653 37.1818 36.858 36.9062C33.8738 34.2299 30.0061 32.6201 25.7828 32.6201Z"
      fill="#9AB7FF"
    />
  </svg>
);

const PasskeyLinearDark = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="0.3">
      <path
        d="M32.56 32.925C32.56 32.925 17.723 34.3616 16.2871 48.2489H37.3462V37.2348L32.56 32.925Z"
        fill="#9AB7FF"
      />
      <path
        d="M33.0829 16.098C35.527 18.1777 36.0221 23.0904 33.2893 26.3056C30.5564 29.5207 25.6305 29.8207 23.1864 27.741C20.9411 26.4573 21.4416 21.7648 24.1744 18.5497C26.9072 15.3346 31.1467 14.4505 33.0829 16.098Z"
        fill="#9AB7FF"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2554 19.3789C16.2554 13.832 20.752 9.33533 26.2989 9.33533C31.8458 9.33533 36.3425 13.832 36.3425 19.3789C36.3425 24.9258 31.8458 29.4224 26.2989 29.4224C20.752 29.4224 16.2554 24.9258 16.2554 19.3789ZM26.2989 11.1665C21.7634 11.1665 18.0866 14.8433 18.0866 19.3789C18.0866 23.9144 21.7634 27.5912 26.2989 27.5912C30.8345 27.5912 34.5113 23.9144 34.5113 19.3789C34.5113 14.8433 30.8345 11.1665 26.2989 11.1665ZM45.4672 21.9709C42.3183 21.9709 39.7655 24.5236 39.7655 27.6726C39.7655 29.8521 40.9881 31.7474 42.7892 32.7077C43.3189 32.9901 43.7204 33.5513 43.7204 34.2288V45.5282L45.1372 46.9279C45.2302 47.0197 45.3815 47.0135 45.4666 46.9144L47.7592 44.2449C47.8347 44.157 47.8312 44.026 47.751 43.9423L46.9207 43.0746C46.1912 42.3123 46.157 41.1214 46.8416 40.3184L48.7533 38.0761C48.8207 37.9971 48.8253 37.8822 48.7646 37.798L47.099 35.4893C46.3901 34.5065 46.9402 33.2731 47.8483 32.855C49.8101 31.952 51.1689 29.97 51.1689 27.6726C51.1689 24.5236 48.6162 21.9709 45.4672 21.9709ZM37.9343 27.6726C37.9343 23.5123 41.3069 20.1397 45.4672 20.1397C49.6275 20.1397 53.0001 23.5123 53.0001 27.6726C53.0001 30.6986 51.2159 33.306 48.646 34.5037L50.2497 36.7267C50.8041 37.4952 50.7616 38.543 50.1468 39.2642L48.2351 41.5065C48.1601 41.5945 48.1638 41.725 48.2438 41.8085L49.0741 42.6762C49.8056 43.4406 49.8377 44.6353 49.1484 45.438L46.8558 48.1075C46.0791 49.012 44.6984 49.0685 43.8503 48.2306L42.3874 46.7855C42.0686 46.4705 41.8892 46.0411 41.8892 45.593V34.3029C39.536 33.0307 37.9343 30.5394 37.9343 27.6726ZM42.7468 25.5671C42.7468 24.0647 43.9647 22.8467 45.4671 22.8467C46.9695 22.8467 48.1875 24.0647 48.1875 25.5671C48.1875 27.0694 46.9695 28.2874 45.4671 28.2874C43.9647 28.2874 42.7468 27.0694 42.7468 25.5671ZM45.4671 24.6779C44.9761 24.6779 44.578 25.076 44.578 25.5671C44.578 26.0581 44.9761 26.4562 45.4671 26.4562C45.9582 26.4562 46.3562 26.0581 46.3562 25.5671C46.3562 25.076 45.9582 24.6779 45.4671 24.6779ZM7.62319 45.078C9.87583 36.8533 17.1315 30.7889 25.7828 30.7889C30.4839 30.7889 34.7808 32.5836 38.0807 35.5429C38.8177 36.2039 39.1778 37.1426 39.1778 38.0741V45.5866C39.1778 47.5626 37.5759 49.1645 35.5998 49.1645H10.9264C8.83847 49.1645 7.01639 47.2936 7.62319 45.078ZM25.7828 32.6201C18.027 32.6201 11.4433 38.0627 9.38937 45.5618C9.15592 46.4141 9.83332 47.3333 10.9264 47.3333H35.5998C36.5645 47.3333 37.3465 46.5512 37.3465 45.5866V38.0741C37.3465 37.603 37.1653 37.1818 36.858 36.9062C33.8738 34.2299 30.0061 32.6201 25.7828 32.6201Z"
      fill="white"
    />
  </svg>
);

const PasskeyFilledDark = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.6437 18.9649C35.6437 24.2175 31.3856 28.4757 26.133 28.4757C20.8803 28.4757 16.6222 24.2175 16.6222 18.9649C16.6222 13.7122 20.8803 9.4541 26.133 9.4541C31.3856 9.4541 35.6437 13.7122 35.6437 18.9649ZM48.579 35.1928C48.2548 34.7434 48.4816 34.1046 48.985 33.8729C51.3548 32.782 53 30.3863 53 27.6064C53 23.7985 49.9131 20.7116 46.1052 20.7116C42.2972 20.7116 39.2103 23.7985 39.2103 27.6064C39.2103 30.2435 40.6908 32.5347 42.8658 33.6945C43.1431 33.8423 43.3309 34.1233 43.3309 34.4376V46.2784C43.3309 46.4902 43.4158 46.6933 43.5665 46.8422L45.0907 48.348C45.581 48.8323 46.3791 48.7996 46.8281 48.2768L49.2169 45.4953C49.6153 45.0313 49.5967 44.3407 49.1739 43.8988L48.3088 42.9948C47.887 42.5541 47.8673 41.8657 48.263 41.4016L50.2549 39.0652C50.6103 38.6483 50.6349 38.0426 50.3144 37.5983L48.579 35.1928ZM47.9854 25.4126C47.9854 26.4511 47.1436 27.293 46.105 27.293C45.0665 27.293 44.2246 26.4511 44.2246 25.4126C44.2246 24.374 45.0665 23.5322 46.105 23.5322C47.1436 23.5322 47.9854 24.374 47.9854 25.4126ZM10.1079 49.0457C8.44424 49.0457 7.14026 47.5807 7.60167 45.9824C9.96467 37.7966 17.5433 31.8075 26.5273 31.8075C31.4128 31.8075 35.8826 33.5786 39.3242 36.5108C39.8988 37.0004 40.2002 37.7303 40.2002 38.4852V46.2717C40.2002 47.8038 38.9583 49.0457 37.4262 49.0457H10.1079Z"
      fill="#9AB7FF"
    />
  </svg>
);

const PasskeyFlatDark = ({
  ...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.5792 35.1929C48.255 34.7435 48.4817 34.1046 48.9851 33.8729C51.3549 32.782 53.0001 30.3864 53.0001 27.6065C53.0001 23.7986 49.9132 20.7117 46.1053 20.7117C42.2974 20.7117 39.2104 23.7986 39.2104 27.6065C39.2104 30.2435 40.6909 32.5348 42.8659 33.6945C43.1433 33.8424 43.3311 34.1233 43.3311 34.4376V46.2784C43.3311 46.4903 43.4159 46.6933 43.5666 46.8422L45.0908 48.348C45.5811 48.8324 46.3792 48.7997 46.8282 48.2768L49.217 45.4954C49.6155 45.0314 49.5969 44.3408 49.174 43.8989L48.3089 42.9949C47.8872 42.5542 47.8674 41.8658 48.2631 41.4016L50.255 39.0652C50.6104 38.6484 50.635 38.0426 50.3145 37.5984L48.5792 35.1929ZM47.9856 25.4126C47.9856 26.4511 47.1437 27.293 46.1051 27.293C45.0666 27.293 44.2247 26.4511 44.2247 25.4126C44.2247 24.3741 45.0666 23.5322 46.1051 23.5322C47.1437 23.5322 47.9856 24.3741 47.9856 25.4126Z"
      fill="#9AB7FF"
    />
    <g opacity="0.4">
      <path
        d="M26.133 28.4758C31.3856 28.4758 35.6437 24.2177 35.6437 18.965C35.6437 13.7123 31.3856 9.45422 26.133 9.45422C20.8803 9.45422 16.6222 13.7123 16.6222 18.965C16.6222 24.2177 20.8803 28.4758 26.133 28.4758Z"
        fill="#9AB7FF"
      />
      <path
        d="M10.1079 49.0457C8.44424 49.0457 7.14026 47.5807 7.60167 45.9823C9.96469 37.7966 17.5433 31.8075 26.5273 31.8075C31.4127 31.8075 35.8826 33.5785 39.3241 36.5108C39.8988 37.0004 40.2001 37.7302 40.2001 38.4851V46.2717C40.2001 47.8037 38.9582 49.0457 37.4261 49.0457H10.1079Z"
        fill="#9AB7FF"
      />
    </g>
  </svg>
);
