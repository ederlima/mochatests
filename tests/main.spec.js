import chai, { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylist } from '../src/main'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

describe('Main', () => {
    let fetchedStub
    let promise

    beforeEach(() => {
        //stub substitui o global fetch
        fetchedStub = sinon.stub(global, 'fetch')
        promise = fetchedStub.returnsPromise() // retorna a promise
    })

    afterEach(() => {
        fetchedStub.restore() // encerrra o fetch
    })


    describe('Smoke Tests', () => {

        it('should exist the search method', () =>
        expect(search).to.exist
        )

        it('should exist the searchAlbums method', () =>
        expect(searchAlbums).to.exist
        )

        it('should exist the searchArtists method', () =>
        expect(searchArtists).to.exist
        )

        it('should exist the searchTracks method', () =>
        expect(searchTracks).to.exist
        )

        it('should exist the searchPlaylist method', () =>
        expect(searchPlaylist).to.exist
        )
    })

    describe('Generic Search', () => {
        
        it('should call fetch function', () => {
        search()
        expect(fetchedStub).to.have.been.calledOnce // chama uma vez, calledTwice 2x
        })

        it('should recive the correct url to fetch', () => {
        context('passing one type', () => {
            search('Incubus', 'artist')
            expect(fetchedStub).to.have.been
            .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')
    
            search('Incubus', 'album')
            expect(fetchedStub).to.have.been
            .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
        })

        context('passing one more than one type', () => {
            search('Incubus', ['artist', 'album'])

            expect(fetchedStub).to.have.been
            .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
        })
        })

        it('should return the JSON data from the promise', () => {
        promise.resolves({ body: 'json' })
        
        const artists = search('Incubus', 'artist')
        expect(artists.resolveValue).to.be.eql({ body: 'json' })
        })
    })
    describe('Search Artists', () => {
        it('Verificar se o fetch foi chamado', () => {
            const artists = searchArtists('Incubus')
            expect(fetchedStub).to.have.been.calledOnce            
        })
        it('Verificando a url da chamada', () => {
            const artist = searchArtists('Incubus')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')
            const artist2 = searchArtists('Muse')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
        })
    })
    describe('Search Albums', () => {
        it('Verificar se o fetch foi chamado', () => {
            const album = searchAlbums('Album X')
            expect(fetchedStub).to.have.been.calledOnce
        })
        it('Verificar a url da chamada', () => {
            const albumUrl = searchAlbums('AlbumY')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AlbumY&type=album')
            const albumUrl2 = searchAlbums('AlbumZ')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AlbumZ&type=album')
        })
    })
    describe('Search Tracks', () => {
        it('Verificar se o fetch foi chamado', () => {
            const trackName = searchTracks('TrackOne')
            expect(fetchedStub).to.have.been.calledOnce
        } )
        it('Verificar se a url chamada é a correta', () => {
            const trackSearchUrl = searchTracks('TrackOne')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=TrackOne&type=track')
        })
        it('Verificar se a url está devidamente parametrizada', () => {
            const trackSearchUrl2 = searchTracks('TrackTwo')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=TrackTwo&type=track')
        })
    })
    describe('Search Playlists', () => {
        it('Verificar se o fetch foi chamado', () => {
            const playlist = searchPlaylist('PlaylistOne')
            expect(fetchedStub).to.have.been.calledOnce
        })
        it('Verificar se o fetch chama a do spotify', () => {
            const playlistUrl = searchPlaylist('PlaylistOne')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=PlaylistOne&type=playlist')
        })
        it('Verificar se a searchPlaylist está parametrizada', () => {
            const playlistUrlParam = searchPlaylist('PlaylistTwo')
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=PlaylistTwo&type=playlist')
        })
    })
});
