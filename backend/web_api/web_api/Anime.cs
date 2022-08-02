namespace web_api
{
    
        public class Anime
        {
            public Datum[] data { get; set; }
        }

        public class Datum
        {
            public int mal_id { get; set; }
            public Images images { get; set; }
            public string title { get; set; }
            public string title_japanese { get; set; }
            public int episodes { get; set; }
            public string rating { get; set; }
            public float score { get; set; }
            public int rank { get; set; }
            public string synopsis { get; set; }
            public int year { get; set; }

        }

        public class Images
        {
            public Jpg jpg { get; set; }
        }

        public class Jpg
        {
            public string image_url { get; set; }
            public string small_image_url { get; set; }
            public string large_image_url { get; set; }
        }

}
