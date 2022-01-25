import reducer, {
  ApplicationKeys,
  closeApplication,
  initialState,
  maximizeApplication,
  minMaxApplication,
  openApplication,
  resetApplicationState,
  updateActiveTitle,
  updateZStack,
} from ".";

describe("ApplicationSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should open application", () => {
    const prevState = {
      ...initialState,
      safari: { ...initialState.safari, isOpen: false },
    };

    expect(reducer(prevState, openApplication(ApplicationKeys.SAFARI))).toEqual(
      {
        ...initialState,
        safari: {
          ...initialState.safari,
          isOpen: true,
        },
      }
    );
  });

  it("should close application", () => {
    const prevState = {
      ...initialState,
      safari: { ...initialState.safari, isOpen: true },
    };

    expect(
      reducer(prevState, closeApplication(ApplicationKeys.SAFARI))
    ).toEqual({
      ...initialState,
      safari: {
        ...initialState.safari,
        isOpen: false,
      },
    });
  });

  it("should maximize application", () => {
    const prevState = {
      ...initialState,
      safari: { ...initialState.safari, windowStatus: "normal" as any },
    };

    expect(
      reducer(prevState, maximizeApplication(ApplicationKeys.SAFARI))
    ).toEqual({
      ...initialState,
      safari: {
        ...initialState.safari,
        windowStatus: "maximized",
      },
    });
  });

  it.each`
    prevWindowStatus | expected
    ${"normal"}      | ${"maximized"}
    ${"maximized"}   | ${"normal"}
  `(
    "should minimize or maximize application",
    ({ prevWindowStatus, expected }) => {
      const prevState = {
        ...initialState,
        safari: { ...initialState.safari, windowStatus: prevWindowStatus },
      };

      expect(
        reducer(prevState, minMaxApplication(ApplicationKeys.SAFARI))
      ).toEqual({
        ...initialState,
        safari: {
          ...initialState.safari,
          windowStatus: expected,
        },
      });
    }
  );

  it.each`
    prevActiveTitle | payload                  | expected
    ${"Safari"}     | ${null}                  | ${"Finder"}
    ${"Safari"}     | ${ApplicationKeys.NOTES} | ${"Notes"}
  `("should update active title", ({ prevActiveTitle, payload, expected }) => {
    const prevState = { ...initialState, activeTitle: prevActiveTitle };

    expect(reducer(prevState, updateActiveTitle(payload))).toEqual({
      ...initialState,
      activeTitle: expected,
    });
  });

  it.each`
    prevZStack                                        | payload                   | expected
    ${[]}                                             | ${ApplicationKeys.SIRI}   | ${[ApplicationKeys.SIRI]}
    ${[ApplicationKeys.VSCODE]}                       | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.VSCODE]}
    ${[ApplicationKeys.VSCODE]}                       | ${ApplicationKeys.SIRI}   | ${[ApplicationKeys.VSCODE, ApplicationKeys.SIRI]}
    ${[ApplicationKeys.VSCODE, ApplicationKeys.SIRI]} | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.SIRI, ApplicationKeys.VSCODE]}
  `("should update z stack", ({ prevZStack, payload, expected }) => {
    const prevState = { ...initialState, zStack: prevZStack };

    expect(reducer(prevState, updateZStack(payload))).toEqual({
      ...prevState,
      zStack: expected,
    });
  });

  it("should reset application state", () => {
    const prevState = { ...initialState, activeTitle: "Safari" };

    expect(reducer(prevState, resetApplicationState())).toEqual(initialState);
  });
});
