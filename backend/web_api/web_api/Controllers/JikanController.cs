using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JikanController : ControllerBase

        
    {
        private static List<Anime> animes = new List<Anime>
        {
          new Anime
          {
              
          }
        };

        private readonly HttpClient _client;
        /// <summary />
        public JikanController(IHttpClientFactory clientFactory)
        {
            if (clientFactory is null)
            {
                throw new ArgumentNullException(nameof(clientFactory));
            }
            _client = clientFactory.CreateClient("jikan");
        }

        public JikanController()
        {

        }

        

        /// <summary>
        /// Find an anime from jikan api and add it to your list of animes
        /// </summary>
        /// <returns>An list of JSON object representing the list of anime</returns>
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetYourAnime(String animeName)
        {
            Anime anime;
            var res = await _client.GetAsync("?q=" + animeName + "&limit=1");

            anime = await res.Content.ReadFromJsonAsync<Anime>();
            Console.WriteLine(res);
            animes.Add(anime);

            return Ok(animes);
        }

        /// <summary>
        /// Get your list of animes
        /// </summary>
        /// <returns>A JSON object representing your list of animes</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<Anime>>> GetAnimeList()
        {
            return Ok(animes);
        }

        /// <summary>
        /// Updates infomation on a specific anime in your list 
        /// </summary>
        /// <returns>A JSON object representing your list of animes</returns>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<Anime>>> UpdateAnimeList(Anime request)
        {
            var anime = animes.Find(a => a.data.ElementAt(0).mal_id == request.data.ElementAt(0).mal_id);
            if (anime == null)
                return BadRequest("Anime not in list");

            anime.data.ElementAt(0).rank = request.data.ElementAt(0).rank;
            anime.data.ElementAt(0).mal_id = request.data.ElementAt(0).mal_id;
            anime.data.ElementAt(0).images = request.data.ElementAt(0).images;
            anime.data.ElementAt(0).title = request.data.ElementAt(0).title;
            anime.data.ElementAt(0).title_japanese = request.data.ElementAt(0).title_japanese;
            anime.data.ElementAt(0).rating = request.data.ElementAt(0).rating;
            anime.data.ElementAt(0).score = request.data.ElementAt(0).score;
            anime.data.ElementAt(0).synopsis = request.data.ElementAt(0).synopsis;
            anime.data.ElementAt(0).year = request.data.ElementAt(0).year;
            anime.data.ElementAt(0).episodes = request.data.ElementAt(0).episodes;


            return Ok(animes);
        }

        /// <summary>
        /// Deletes the specified anime from the list
        /// </summary>
        /// <returns>A JSON object representing your list of animes</returns>
        [HttpDelete]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<Anime>>> DeleteAnime(String title)
        {
            var anime = animes.Find(a => a.data.ElementAt(0).title.ToLower() == title.ToLower());
            if (anime == null)
                return BadRequest("Anime not in list");

            animes.Remove(anime);
            
            return Ok(animes);
        }
    }
}
