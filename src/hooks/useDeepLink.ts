import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isDesktop: false,
    userAgent: "",
  });

  useEffect(() => {
    if (typeof globalThis !== "undefined" && globalThis.navigator) {
      const userAgent = globalThis.navigator.userAgent;
      
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isMobile = isIOS || isAndroid || /Mobi|Mobile/.test(userAgent);
      const isDesktop = !isMobile;

      setDeviceInfo({
        isMobile,
        isIOS,
        isAndroid,
        isDesktop,
        userAgent,
      });
    }
  }, []);

  return deviceInfo;
};

interface DeepLinkOptions {
  tournamentId?: string;
  action?: "register" | "view" | "join";
  userId?: string;
  fallbackUrl?: string;
}

export const useDeepLink = () => {
  const deviceInfo = useDeviceDetection();

  const generateDeepLink = (options: DeepLinkOptions): string => {
    const { tournamentId, action = "view", userId } = options;
    
    // Base deep link schemes
    const iosScheme = "saboarena://";
    const androidScheme = "saboarena://";
    
    // Build deep link path
    let path = "";
    if (tournamentId) {
      path = `tournament/${tournamentId}?action=${action}`;
      if (userId) {
        path += `&userId=${userId}`;
      }
    }

    if (deviceInfo.isIOS) {
      return iosScheme + path;
    } else if (deviceInfo.isAndroid) {
      return androidScheme + path;
    } else {
      // Desktop fallback - return web URL
      return options.fallbackUrl || globalThis.location.href;
    }
  };

  const openApp = async (options: DeepLinkOptions): Promise<boolean> => {
    const deepLink = generateDeepLink(options);
    
    if (deviceInfo.isMobile) {
      try {
        // Attempt to open the app
        globalThis.location.href = deepLink;
        
        // Set a timeout to detect if app failed to open
        const timeout = setTimeout(() => {
          // If app didn't open, redirect to app store
          if (deviceInfo.isIOS) {
            globalThis.location.href = "https://apps.apple.com/us/app/sabo-arena/id6753811170";
          } else if (deviceInfo.isAndroid) {
            globalThis.location.href = "https://play.google.com/store/apps/details?id=com.saboarena.app"; // Replace with actual package name
          }
        }, 2000);

        // If page becomes hidden (app opened), clear the timeout
        const handleVisibilityChange = () => {
          if (document.hidden) {
            clearTimeout(timeout);
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        
        // Cleanup
        setTimeout(() => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        }, 3000);

        return true;
      } catch (error) {
        console.error("Failed to open app:", error);
        return false;
      }
    }

    return false;
  };

  const getUniversalLink = (options: DeepLinkOptions): string => {
    const { tournamentId, action = "view", userId } = options;
    
    // Universal link format that works for both web and mobile
    let universalLink = `${globalThis.location.origin}/tournaments/${tournamentId}`;
    
    const params = new URLSearchParams();
    if (action !== "view") params.append("action", action);
    if (userId) params.append("userId", userId);
    
    if (params.toString()) {
      universalLink += `?${params.toString()}`;
    }

    return universalLink;
  };

  const smartRedirect = async (options: DeepLinkOptions) => {
    if (deviceInfo.isMobile) {
      // On mobile, try to open app first
      const appOpened = await openApp(options);
      if (!appOpened && options.fallbackUrl) {
        // If app failed to open, use fallback URL
        globalThis.location.href = options.fallbackUrl;
      }
    } else if (options.fallbackUrl) {
      // On desktop, use web registration
      globalThis.location.href = options.fallbackUrl;
    }
  };

  return {
    deviceInfo,
    generateDeepLink,
    openApp,
    getUniversalLink,
    smartRedirect,
  };
};