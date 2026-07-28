import { useCallback, useEffect, useState } from 'react';

/**
 * Captures beforeinstallprompt so Install buttons actually work on Android Chrome.
 */
export function usePwaInstall() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setInstalled(standalone);

    // Restore prompt if browser already fired it earlier in session
    if (window.__r2sDeferredPrompt) {
      setDeferred(window.__r2sDeferredPrompt);
      setCanPrompt(true);
    }

    const onBip = (e) => {
      e.preventDefault();
      window.__r2sDeferredPrompt = e;
      setDeferred(e);
      setCanPrompt(true);
    };

    const onInstalled = () => {
      setInstalled(true);
      setCanPrompt(false);
      setDeferred(null);
      window.__r2sDeferredPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    const promptEvent = deferred || window.__r2sDeferredPrompt;
    if (!promptEvent) {
      return { ok: false, reason: 'unavailable' };
    }
    try {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      setDeferred(null);
      window.__r2sDeferredPrompt = null;
      setCanPrompt(false);
      if (outcome === 'accepted') {
        setInstalled(true);
        return { ok: true, reason: 'accepted' };
      }
      return { ok: false, reason: 'dismissed' };
    } catch {
      return { ok: false, reason: 'error' };
    }
  }, [deferred]);

  return { install, installed, canPrompt };
}

export default usePwaInstall;
