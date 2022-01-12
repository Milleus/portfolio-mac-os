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
    prevIndex | expected
    ${0}      | ${1}
    ${1}      | ${0}
  `("should increment audio playlist index", ({ prevIndex, expected }) => {
    const prevState = { ...initialState, audioPlaylistIndex: prevIndex };

    expect(reducer(prevState, incrementAudioPlaylistIndex())).toEqual({
      ...prevState,
      audioPlaylistIndex: expected,
    });
  });

  it("should update system", () => {
    const prevState = initialState;

    expect(reducer(prevState, updateSystem({ isWifiOn: false }))).toEqual({
      ...prevState,
      isWifiOn: false,
    });
  });
});
