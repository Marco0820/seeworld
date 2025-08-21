declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
    FB?: {
      init: (config: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: {
          authResponse?: {
            accessToken: string;
            userID: string;
          };
          status: string;
        }) => void,
        options?: { scope: string }
      ) => void;
      logout: (callback?: () => void) => void;
      api: (
        path: string,
        params: { fields: string },
        callback: (response: any) => void
      ) => void;
    };
  }
}

export {};
