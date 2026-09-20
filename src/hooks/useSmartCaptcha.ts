import { useEffect, useRef } from 'react';

export const useSmartCaptcha = (onToken: (token: string) => void, onCancel: () => void) => {
  const widget = useRef<number | null>(null);
  const callbacks = useRef({ onToken, onCancel });
  callbacks.current = { onToken, onCancel };
  const pending = useRef(false);
  const accepted = useRef(false);

  useEffect(() => {
    let hiddenTimer: ReturnType<typeof setTimeout>;
    const cancelled = () => {
      if (!pending.current || accepted.current) return;
      pending.current = false;
      callbacks.current.onCancel();
    };
    const render = () => {
      const captcha = window.smartCaptcha;
      if (!captcha || widget.current !== null || !document.getElementById('captcha-container')) return;
      widget.current = captcha.render('captcha-container', {
        sitekey: 'ysc1_ew6LWS0a0XeqfLY7YxmAH4rhPfAEpXi2mnVcvpPg58abfc86',
        invisible: true,
        callback: (token: string) => {
          if (!pending.current || accepted.current || !token) return;
          accepted.current = true;
          callbacks.current.onToken(token);
        },
      });
      captcha.subscribe(widget.current, 'challenge-hidden', () => {
        hiddenTimer = setTimeout(cancelled, 0);
      });
      captcha.subscribe(widget.current, 'network-error', cancelled);
      captcha.subscribe(widget.current, 'javascript-error', cancelled);
      clearInterval(timer);
    };
    const timer = setInterval(render, 300);
    render();
    return () => {
      clearInterval(timer);
      clearTimeout(hiddenTimer);
      if (widget.current !== null) window.smartCaptcha?.destroy(widget.current);
      widget.current = null;
      pending.current = false;
    };
  }, []);

  return {
    execute: () => {
      if (pending.current) return;
      pending.current = true;
      accepted.current = false;
      try {
        if (!window.smartCaptcha || widget.current === null) throw new Error('Captcha unavailable');
        window.smartCaptcha.execute(widget.current);
      } catch {
        pending.current = false;
        callbacks.current.onCancel();
      }
    },
    reset: () => {
      pending.current = false;
      if (widget.current !== null) window.smartCaptcha?.reset(widget.current);
    },
  };
};
