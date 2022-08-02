using NUnit.Framework;
using System.Linq;
using web_api;
using Moq;
using web_api.Controllers;
using System.Net.Http;
using System.Collections.Generic;

namespace UnitTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        //tests if GetAnimeList function is working in the JikanController
        [Test]
        public void Test1()
        {
            List<Anime> animes = new List<Anime> { };
            Anime anime = new Anime();
            animes.Add(anime);

            var controller = new JikanController();
            var list = controller.GetAnimeList();
            
            Assert.AreEqual(list, animes);
        }
    }
}