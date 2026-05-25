import { useCallback, useReducer } from 'react';
import type { WindowDefinition, WindowId, WindowState } from '../types';

interface State {
  windows: Record<string, WindowState>;
  order: WindowId[];
  activeId: WindowId | null;
  nextZ: number;
}

type Action =
  | { type: 'open'; def: WindowDefinition }
  | { type: 'requestClose'; id: WindowId }
  | { type: 'finalizeClose'; id: WindowId }
  | { type: 'focus'; id: WindowId }
  | { type: 'minimize'; id: WindowId }
  | { type: 'restore'; id: WindowId }
  | { type: 'toggleMax'; id: WindowId; viewport: { w: number; h: number } }
  | { type: 'move'; id: WindowId; x: number; y: number }
  | { type: 'resize'; id: WindowId; width: number; height: number }
  | {
      type: 'setBounds';
      id: WindowId;
      x: number;
      y: number;
      width: number;
      height: number;
      /** When true, remember the current bounds so a later restore can return to them. */
      savePrev?: boolean;
      /** When true, mark as maximized (covers viewport). */
      maximized?: boolean;
    };

const INITIAL: State = {
  windows: {},
  order: [],
  activeId: null,
  nextZ: 10,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open': {
      const existing = state.windows[action.def.id];
      if (existing) {
        return reducer(state, { type: 'focus', id: action.def.id });
      }
      const cascadeCount = state.order.length;
      const win: WindowState = {
        id: action.def.id,
        titleKey: action.def.titleKey,
        icon: action.def.icon,
        width: action.def.defaultSize.width,
        height: action.def.defaultSize.height,
        x: 80 + cascadeCount * 26,
        y: 60 + cascadeCount * 26,
        zIndex: state.nextZ,
        minimized: false,
        maximized: false,
        closing: false,
      };
      return {
        ...state,
        windows: { ...state.windows, [action.def.id]: win },
        order: [...state.order, action.def.id],
        activeId: action.def.id,
        nextZ: state.nextZ + 1,
      };
    }

    case 'requestClose': {
      const w = state.windows[action.id];
      if (!w || w.closing) return state;
      const otherOrder = state.order.filter((i) => i !== action.id);
      const nextActive =
        state.activeId === action.id
          ? otherOrder[otherOrder.length - 1] ?? null
          : state.activeId;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...w, closing: true } },
        activeId: nextActive,
      };
    }

    case 'finalizeClose': {
      const rest = { ...state.windows };
      delete rest[action.id];
      const order = state.order.filter((i) => i !== action.id);
      return {
        ...state,
        windows: rest,
        order,
      };
    }

    case 'focus': {
      const w = state.windows[action.id];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, zIndex: state.nextZ, minimized: false },
        },
        activeId: action.id,
        nextZ: state.nextZ + 1,
      };
    }

    case 'minimize': {
      const w = state.windows[action.id];
      if (!w) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...w, minimized: true } },
        activeId:
          state.activeId === action.id
            ? state.order.filter((i) => i !== action.id).pop() ?? null
            : state.activeId,
      };
    }

    case 'restore': {
      return reducer(state, { type: 'focus', id: action.id });
    }

    case 'toggleMax': {
      const w = state.windows[action.id];
      if (!w) return state;
      if (w.maximized && w.prevBounds) {
        return {
          ...state,
          windows: {
            ...state.windows,
            [action.id]: {
              ...w,
              maximized: false,
              ...w.prevBounds,
              prevBounds: undefined,
            },
          },
        };
      }
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            maximized: true,
            prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
            x: 0,
            y: 0,
            width: action.viewport.w,
            height: action.viewport.h - 30,
          },
        },
      };
    }

    case 'move': {
      const w = state.windows[action.id];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, x: action.x, y: action.y },
        },
      };
    }

    case 'resize': {
      const w = state.windows[action.id];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, width: action.width, height: action.height },
        },
      };
    }

    case 'setBounds': {
      const w = state.windows[action.id];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            x: action.x,
            y: action.y,
            width: action.width,
            height: action.height,
            maximized: action.maximized ?? false,
            prevBounds: action.savePrev
              ? w.prevBounds ?? {
                  x: w.x,
                  y: w.y,
                  width: w.width,
                  height: w.height,
                }
              : action.maximized
                ? w.prevBounds
                : undefined,
          },
        },
      };
    }
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const open = useCallback(
    (def: WindowDefinition) => dispatch({ type: 'open', def }),
    [],
  );
  const close = useCallback(
    (id: WindowId) => dispatch({ type: 'requestClose', id }),
    [],
  );
  const finalizeClose = useCallback(
    (id: WindowId) => dispatch({ type: 'finalizeClose', id }),
    [],
  );
  const focus = useCallback(
    (id: WindowId) => dispatch({ type: 'focus', id }),
    [],
  );
  const minimize = useCallback(
    (id: WindowId) => dispatch({ type: 'minimize', id }),
    [],
  );
  const restore = useCallback(
    (id: WindowId) => dispatch({ type: 'restore', id }),
    [],
  );
  const toggleMax = useCallback(
    (id: WindowId) =>
      dispatch({
        type: 'toggleMax',
        id,
        viewport: { w: window.innerWidth, h: window.innerHeight },
      }),
    [],
  );
  const move = useCallback(
    (id: WindowId, x: number, y: number) =>
      dispatch({ type: 'move', id, x, y }),
    [],
  );
  const resize = useCallback(
    (id: WindowId, width: number, height: number) =>
      dispatch({ type: 'resize', id, width, height }),
    [],
  );
  const setBounds = useCallback(
    (
      id: WindowId,
      bounds: { x: number; y: number; width: number; height: number },
      opts?: { savePrev?: boolean; maximized?: boolean },
    ) =>
      dispatch({
        type: 'setBounds',
        id,
        ...bounds,
        savePrev: opts?.savePrev,
        maximized: opts?.maximized,
      }),
    [],
  );

  return {
    state,
    open,
    close,
    finalizeClose,
    focus,
    minimize,
    restore,
    toggleMax,
    move,
    resize,
    setBounds,
  };
}
