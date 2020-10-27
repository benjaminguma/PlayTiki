const axios = require("axios");

class Client {
  async getAlbums(limit = null, page = null, year = null) {
    const res = await axios.get(
      `/album/?limit=${limit}&page=${page}&year=${year}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return res;
  }

  async getAlbumSongs(album_id) {
    const res = await axios.get(`/album/${album_id}/songs`, {
      headers: {
        accept: "application/json",
      },
    });
    return res;
  }

  async getArtistSongs(album_id) {
    const res = await axios.get(`/artist/${album_id}/songs`, {
      headers: {
        accept: "application/json",
      },
    });
    return res;
  }

  async getArtists(limit = null, page = null) {
    const res = await axios.get(`/artist/?limit=${limit}&page=${page}`, {
      headers: {
        accept: "application/json",
      },
    });
    return res;
  }

  async getSongs(limit = null, page = null, year = null) {
    const res = await axios({
      method: "GET",
      url: `/songs/?limit=${limit}&page=${page}&year=${year}`,
      headers: {
        accept: "Application/json",
      },
    });
    return res;
  }

  async search(key, collection, limit, page) {
    const res = await axios({
      method: "GET",
      url: `/search?key=${key}&collection=${collection}&limit=${limit}&page=${page}`,
      headers: {
        accept: "Application/json",
      },
    });

    return res;
  }
}

export default new Client();
