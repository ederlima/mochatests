global.fetch = require('node-fetch')

import { searchAlbums } from '../src/main'


const albums = searchAlbums('Incubus')

albums.then( data => data.albums.items.map( album => console.log('Nome do Album: ', album.name)))