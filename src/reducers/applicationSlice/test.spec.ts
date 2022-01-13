import reducer, {
  ApplicationKeys,
  initialState,
  resetApplicationState,
  updateActiveTitle,
  updateApplicationStatus,
  updateZStack,
} from ".";

describe("ApplicationSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

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

  it("should update application status", () => {
    const prevState = initialState;

    expect(
      reducer(
        prevState,
        updateApplicationStatus({
          appKey: ApplicationKeys.SAFARI,
          status: { windowStatus: "maximized" },
        })
      )
    ).toEqual({
      ...prevState,
      [ApplicationKeys.SAFARI]: {
        ...prevState[ApplicationKeys.SAFARI],
        windowStatus: "maximized",
      },
    });
  });

  it("should reset application state", () => {
    const prevState = { ...initialState, activeTitle: "Safari" };

    expect(reducer(prevState, resetApplicationState())).toEqual(initialState);
  });
});
