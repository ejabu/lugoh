// @flow
export const UPDATE = 'UPDATE';

function update(verseIndex) {
  return {
    type: UPDATE,
    verseIndex: verseIndex
  };
}
function updateSearchResult(data) {
  return {
    type: 'UPDATE_SEARCH',
    data: data
  };
}

export function updateVerseIndex(dispatch, verseIndex) {
  dispatch(update(verseIndex));
}
export function searchQuery(dispatch, verseIndex) {
  dispatch(update(verseIndex));
}
export function resultChanged(dispatch, data) {
  dispatch(updateSearchResult(data));
}
