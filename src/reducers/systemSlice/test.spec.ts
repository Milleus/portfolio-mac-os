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
    prevIndex | expectedIndex
    ${0}      | ${1}
    ${1}      | ${0}
  `(
    "should handle audio playlist index increment",
    ({ prevIndex, expectedIndex }) => {
      const prevState = {
        ...initialState,
        audioPlaylistIndex: prevIndex,
      };
      expect(reducer(prevState, incrementAudioPlaylistIndex())).toEqual({
        ...prevState,
        audioPlaylistIndex: expectedIndex,
      });
    }
  );

  it("should handle system update", () => {
    const prevState = initialState;
    expect(reducer(prevState, updateSystem({ isWifiOn: false }))).toEqual({
      ...prevState,
      isWifiOn: false,
    });
  });
});
