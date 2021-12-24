import reducer, {
  incrementAudioPlaylistIndex,
  initialState,
  updateSystem,
} from ".";

describe("SystemSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it.each`
    previousIndex | expectedIndex
    ${0}          | ${1}
    ${1}          | ${0}
  `(
    "should handle audio playlist index increment",
    ({ previousIndex, expectedIndex }) => {
      const previousState = {
        ...initialState,
        audioPlaylistIndex: previousIndex,
      };
      expect(reducer(previousState, incrementAudioPlaylistIndex())).toEqual({
        ...previousState,
        audioPlaylistIndex: expectedIndex,
      });
    }
  );

  it("should handle system update", () => {
    const previousState = initialState;
    expect(reducer(previousState, updateSystem({ isWifiOn: false }))).toEqual({
      ...previousState,
      isWifiOn: false,
    });
  });
});
