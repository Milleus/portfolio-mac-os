import reducer, {
  ApplicationKeys,
  initialState,
  updateApplication,
  updateZStack,
} from ".";

describe("ApplicationSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it.each`
    prevZStack                                          | appKey                    | expectedZStack
    ${[]}                                               | ${ApplicationKeys.SAFARI} | ${[ApplicationKeys.SAFARI]}
    ${[ApplicationKeys.VSCODE]}                         | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.VSCODE]}
    ${[ApplicationKeys.VSCODE]}                         | ${ApplicationKeys.SAFARI} | ${[ApplicationKeys.VSCODE, ApplicationKeys.SAFARI]}
    ${[ApplicationKeys.VSCODE, ApplicationKeys.SAFARI]} | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.SAFARI, ApplicationKeys.VSCODE]}
  `(
    "should handle z stack update",
    ({ prevZStack, appKey, expectedZStack }) => {
      const prevState = {
        ...initialState,
        zStack: prevZStack,
      };
      expect(reducer(prevState, updateZStack(appKey))).toEqual({
        ...prevState,
        zStack: expectedZStack,
      });
    }
  );

  it("should handle application update", () => {
    const prevState = initialState;
    expect(
      reducer(
        prevState,
        updateApplication({
          [ApplicationKeys.SAFARI]: { isOpen: true, windowStatus: "maximized" },
        })
      )
    ).toEqual({
      ...prevState,
      [ApplicationKeys.SAFARI]: { isOpen: true, windowStatus: "maximized" },
    });
  });
});
