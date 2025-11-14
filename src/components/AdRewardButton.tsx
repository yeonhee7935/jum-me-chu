import { useCallback, useState } from "react";
import { GoogleAdMob } from "@apps-in-toss/web-framework";
import { Button } from "@toss/tds-mobile";

const AD_GROUP_ID = "<AD_GROUP_ID>";

interface Props {
  onRewarded: () => void; // 광고 시청 완료 후 실행할 콜백
}

export function AdRewardButton({ onRewarded }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "loaded" | "showing"
  >("idle");

  const loadAd = useCallback(() => {
    if (GoogleAdMob.loadAppsInTossAdMob.isSupported() !== true) {
      console.warn("AdMob not supported");
      return;
    }

    setStatus("loading");

    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        if (event.type === "loaded") {
          console.log("✅ 광고 로드 완료", event.data);
          setStatus("loaded");
        }
      },
      onError: (error) => {
        console.error("❌ 광고 불러오기 실패", error);
        setStatus("idle");
      },
    });

    return cleanup;
  }, []);

  const showAd = useCallback(() => {
    if (GoogleAdMob.showAppsInTossAdMob.isSupported() !== true) {
      console.warn("AdMob show not supported");
      return;
    }

    setStatus("showing");

    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        switch (event.type) {
          case "show":
            console.log("광고 보여짐");
            break;
          case "userEarnedReward":
            console.log("🎁 광고 보상 획득 — 시청 완료");
            setStatus("idle");
            onRewarded();
            break;
          case "dismissed":
            console.log("광고 닫힘");
            setStatus("idle");
            break;
          case "failedToShow":
            console.log("광고 보여주기 실패");
            setStatus("idle");
            break;
        }
      },
      onError: (error) => {
        console.error("❌ 광고 보여주기 실패", error);
        setStatus("idle");
      },
    });
  }, [onRewarded]);

  return (
    <div className="flex flex-col items-center w-full">
      {status === "idle" && (
        <Button display="block" className="w-full" onClick={loadAd}>
          광고 보고 홈으로 가기
        </Button>
      )}
      {status === "loading" && (
        <Button loading display="block" className="w-full">
          광고 로드 중...
        </Button>
      )}
      {status === "loaded" && (
        <Button display="block" className="w-full" onClick={showAd}>
          광고 보기 시작
        </Button>
      )}
      {status === "showing" && (
        <Button disabled display="block" className="w-full">
          광고 시청 중...
        </Button>
      )}
    </div>
  );
}
