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
    previousZStack                                      | appKey                    | expectedZStack
    ${[]}                                               | ${ApplicationKeys.SAFARI} | ${[ApplicationKeys.SAFARI]}
    ${[ApplicationKeys.VSCODE]}                         | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.VSCODE]}
    ${[ApplicationKeys.VSCODE]}                         | ${ApplicationKeys.SAFARI} | ${[ApplicationKeys.VSCODE, ApplicationKeys.SAFARI]}
    ${[ApplicationKeys.VSCODE, ApplicationKeys.SAFARI]} | ${ApplicationKeys.VSCODE} | ${[ApplicationKeys.SAFARI, ApplicationKeys.VSCODE]}
  `(
    "should handle z stack update",
    ({ previousZStack, appKey, expectedZStack }) => {
      const previousState = {
        ...initialState,
        zStack: previousZStack,
      };
      expect(reducer(previousState, updateZStack(appKey))).toEqual({
        ...previousState,
        zStack: expectedZStack,
      });
    }
  );

  it("should handle application update", () => {
    const previousState = initialState;
    expect(
      reducer(
        previousState,
        updateApplication({
          [ApplicationKeys.SAFARI]: { isOpen: true, windowStatus: "maximized" },
        })
      )
    ).toEqual({
      ...previousState,
      [ApplicationKeys.SAFARI]: { isOpen: true, windowStatus: "maximized" },
    });
  });
});
