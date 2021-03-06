import headers from './headers'

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, { headers }) // destructuring do headers:headers de mesmo nome
    .then((response) => response.json())

export const searchArtists = (query) =>
  search(query, 'artist')
export const searchAlbums = (query) =>
  search(query, 'album')

export const searchTracks = (query) =>
  search(query, 'track')

export const searchPlaylist = (query) =>
  search(query, 'playlist')
