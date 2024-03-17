import React, { useEffect, useRef, useState } from "react";
import "./AddMovie-style.css";
import { fetchImage, fetchVideo } from "../aiders/File";
import ActionIcon from "../components/ActionIcon";
import { formatTime } from "../aiders/FormatTime";
import Message from "../components/Message";
import Loading from "../components/Loading";
import ModalNotification from "../parent-components/ModalNotification";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../aiders/ValidateInput";
import { AuthenticateInput } from "../aiders/AuthenticateInput";
import { queryKeyGenerator } from "../aiders/QueryKeyGenerator";
import { uploadNewMovie } from "../database/backend";

function AddMovie() {
  const sampleMovies = [
    {
      Title: "Inception",
      Plot: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
      Genre: "Action, Adventure, Sci-Fi",
      Year: 2010,
      Director: "Christopher Nolan",
      Cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      Duration: "2h 28min",
      Rating: 4.8,
      Cover:
        "https://th.bing.com/th/id/R.2c2dad5a9eb976cc107985d3077ffb56?rik=qm0fQgHFOWSi2Q&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/when i first saw this come together in editing, it actually took my breath away. i cannot believe how insane this experience was. broken top will forever hold a special place in my mind..mp4",
      Size: "10mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "i",
        "in",
        "inc",
        "ince",
        "inception",
        "c",
        "ch",
        "chr",
        "chri",
        "christ",
        "christopher",
        "n",
        "no",
        "nol",
        "nola",
        "nolan",
      ],
    },
    {
      Title: "The Dark Knight",
      Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Genre: "Action, Crime, Drama",
      Year: 2008,
      Director: "Christopher Nolan",
      Cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
      Duration: "2h 32min",
      Rating: 4.7,
      Cover:
        "https://image.tmdb.org/t/p/original/2Ka2nOtSlwuFlsHtrtfHKMIjldC.jpg",
      URL: "https://ojiesuwa.github.io/music/recently i had one of the best weeks of my life with my internet friend, my best friend, jared baird. of c... everything and i'm beyond excited to post the videos we made together! this is the first series i've ever made so be read.mp4",
      Size: "8mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the d",
        "the da",
        "the dar",
        "the dark",
        "the dark ",
        "the dark k",
        "the dark kn",
        "the dark kni",
        "the dark knig",
        "the dark knight",
        "c",
        "ch",
        "chr",
        "chri",
        "christ",
        "christo",
        "christop",
        "christoph",
        "christophe",
        "christopher",
        "n",
        "no",
        "nol",
        "nola",
        "nolan",
      ],
    },
    {
      Title: "Interstellar",
      Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Genre: "Adventure, Drama, Sci-Fi",
      Year: 2014,
      Director: "Christopher Nolan",
      Cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      Duration: "2h 49min",
      Rating: 4.9,
      Cover:
        "https://th.bing.com/th/id/OIP.15MKH3stQdVApMybWu9TyQHaKk?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/just uploaded a video where i attempt to switch up my style and go online thrift shopping! link in bio -).mp4",
      Size: "12mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "i",
        "in",
        "int",
        "inte",
        "inter",
        "interst",
        "interste",
        "interstell",
        "interstella",
        "interstellar",
        "c",
        "ch",
        "chr",
        "chri",
        "christ",
        "christo",
        "christop",
        "christoph",
        "christophe",
        "christopher",
        "n",
        "no",
        "nol",
        "nola",
        "nolan",
      ],
    },
    {
      Title: "The Shawshank Redemption",
      Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: "Drama",
      Year: 1994,
      Director: "Frank Darabont",
      Cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
      Duration: "2h 22min",
      Rating: 4.9,
      Cover:
        "https://th.bing.com/th/id/OIP.Bc_T4YOa1vwBSfJfyU9phwHaLA?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/ahhhh part 1 to “800 MILES” comes out TOMORROW!! this series means so much to me and i’m so excited for you all to see it this week -,).mp4",
      Size: "7mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the s",
        "the sh",
        "the sha",
        "the shaw",
        "the shaws",
        "the shawsh",
        "the shawsha",
        "the shawshan",
        "the shawshank",
        "r",
        "ra",
        "ran",
        "rank",
        "rank ",
        "rank d",
        "rank da",
        "rank dar",
        "rank dara",
        "rank darab",
        "rank darabo",
        "rank darabon",
        "rank darabont",
        "f",
        "fr",
        "fra",
        "fran",
        "frank",
        "d",
        "da",
        "dar",
        "dara",
        "darab",
        "darabo",
        "darabon",
        "darabont",
      ],
    },
    {
      Title: "Pulp Fiction",
      Plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      Genre: "Crime, Drama",
      Year: 1994,
      Director: "Quentin Tarantino",
      Cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
      Duration: "2h 34min",
      Rating: 4.7,
      Cover:
        "https://th.bing.com/th/id/OIP.qkNS9tBn13LjCLuQ5fJWVAHaKQ?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/SO EXCITED TO FINALLY SAY “800 MILES” APPAREL IS OUT NOW! this collection has very limited quantity so make sure to get one while you can ;).mp4",
      Size: "9mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "p",
        "pu",
        "pul",
        "pulp",
        "pulpi",
        "pulp f",
        "pulp fi",
        "pulp fic",
        "pulp fict",
        "pulp ficti",
        "pulp fiction",
        "q",
        "qu",
        "que",
        "quen",
        "quent",
        "quenti",
        "quentin",
        "t",
        "ta",
        "tar",
        "tara",
        "tarant",
        "taranti",
        "tarantin",
        "tarantino",
      ],
    },
    {
      Title: "The Godfather",
      Plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      Genre: "Crime, Drama",
      Year: 1972,
      Director: "Francis Ford Coppola",
      Cast: "Marlon Brando, Al Pacino, James Caan",
      Duration: "2h 55min",
      Rating: 4.9,
      Cover:
        "https://th.bing.com/th/id/R.2a7376a13ea2c6879dffcf1e70fe7a13?rik=jNAE12SPmy64Cg&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/Snapinsta.app_video_044346003BBDA38BA5E68CD7358714AB_video_dashinit.mp4",
      Size: "11mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the g",
        "the go",
        "the god",
        "the godf",
        "the godfa",
        "the godfat",
        "the godfath",
        "the godfathe",
        "the godfather",
        "f",
        "fr",
        "fra",
        "fran",
        "franc",
        "franci",
        "francis",
        "f",
        "fo",
        "for",
        "ford",
        "c",
        "co",
        "cop",
        "copp",
        "coppo",
        "coppol",
        "coppola",
      ],
    },
    {
      Title: "The Matrix",
      Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      Genre: "Action, Sci-Fi",
      Year: 1999,
      Director: "Lana Wachowski, Lilly Wachowski",
      Cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      Duration: "2h 16min",
      Rating: 4.6,
      Cover:
        "https://th.bing.com/th/id/R.ecdbd70e02fd039ddb3cec8f22ac36f6?rik=%2f7t39GSAYu2Mhw&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/7.15.23a story that’s been in the works for over a year now, can’t believe i’m finally putting it out soon.mp4",
      Size: "13mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the m",
        "the ma",
        "the mat",
        "the matr",
        "the matri",
        "the matrix",
        "l",
        "la",
        "lan",
        "lana",
        "lana ",
        "lana w",
        "lana wa",
        "lana wac",
        "lana wach",
        "lana wacho",
        "lana wachow",
        "lana wachows",
        "lana wachowsk",
        "l",
        "li",
        "lil",
        "lill",
        "lilly",
        "lilly ",
        "lilly w",
        "lilly wa",
        "lilly wac",
        "lilly wach",
        "lilly wacho",
        "lilly wachow",
        "lilly wachows",
        "lilly wachowsk",
        "lilly wachowsky",
      ],
    },
    {
      Title: "Fight Club",
      Plot: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
      Genre: "Drama",
      Year: 1999,
      Director: "David Fincher",
      Cast: "Brad Pitt, Edward Norton, Meat Loaf",
      Duration: "2h 19min",
      Rating: 4.8,
      Cover:
        "https://th.bing.com/th/id/OIP.34vdQGKvr361NarwJj92lgHaLH?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/just uploaded a video where i attempt to switch up my style and go online thrift shopping! link in bio -).mp4",
      Size: "6mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "f",
        "fi",
        "fig",
        "figh",
        "fight",
        "fight ",
        "fight c",
        "fight cl",
        "fight clu",
        "fight club",
        "d",
        "da",
        "dav",
        "davi",
        "david",
        "f",
        "fi",
        "fin",
        "finc",
        "finch",
        "finche",
        "fincher",
      ],
    },
    {
      Title: "Forrest Gump",
      Plot: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      Genre: "Drama, Romance",
      Year: 1994,
      Director: "Robert Zemeckis",
      Cast: "Tom Hanks, Robin Wright, Gary Sinise",
      Duration: "2h 22min",
      Rating: 4.8,
      Cover:
        "https://th.bing.com/th/id/R.4a84e29ff2095a33ebef8fcf899aba67?rik=5z%2fydJQ%2b%2bG5I9Q&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/ahhhh part 1 to “800 MILES” comes out TOMORROW!! this series means so much to me and i’m so excited for you all to see it this week -,).mp4",
      Size: "8mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "f",
        "fo",
        "for",
        "forr",
        "forre",
        "forres",
        "forrest",
        "g",
        "gu",
        "gum",
        "gump",
        "r",
        "ro",
        "rob",
        "robe",
        "rober",
        "robert",
        "z",
        "ze",
        "zem",
        "zeme",
        "zemeck",
        "zemecki",
        "zemeckis",
      ],
    },
    {
      Title: "The Lord of the Rings: The Return of the King",
      Plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      Genre: "Action, Adventure, Drama",
      Year: 2003,
      Director: "Peter Jackson",
      Cast: "Elijah Wood, Viggo Mortensen, Ian McKellen",
      Duration: "3h 21min",
      Rating: 4.9,
      Cover:
        "https://th.bing.com/th/id/OIP.lo03lXpwx_dAJaSzqLswGQHaLH?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/SO EXCITED TO FINALLY SAY “800 MILES” APPAREL IS OUT NOW! this collection has very limited quantity so make sure to get one while you can ;).mp4",
      Size: "10mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the l",
        "the lo",
        "the lor",
        "the lord",
        "the lord ",
        "the lord o",
        "the lord of",
        "the lord of ",
        "the lord of t",
        "the lord of th",
        "the lord of the",
        "the lord of the ",
        "the lord of the r",
        "the lord of the ri",
        "the lord of the rin",
        "the lord of the ring",
        "the lord of the rings",
        "p",
        "pe",
        "pet",
        "pete",
        "peter",
        "j",
        "ja",
        "jac",
        "jack",
        "jackso",
        "jackson",
      ],
    },
    {
      Title: "The Silence of the Lambs",
      Plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
      Genre: "Crime, Drama, Thriller",
      Year: 1991,
      Director: "Jonathan Demme",
      Cast: "Jodie Foster, Anthony Hopkins, Lawrence A. Bonney",
      Duration: "1h 58min",
      Rating: 4.7,
      Cover:
        "https://th.bing.com/th/id/OIP.5S1jCRHEJW742rO6Xw_wJgHaLE?rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/SO EXCITED TO FINALLY SAY “800 MILES” APPAREL IS OUT NOW! this collection has very limited quantity so make sure to get one while you can ;).mp4",
      Size: "14mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the s",
        "the si",
        "the sil",
        "the sile",
        "the silen",
        "the silenc",
        "the silence",
        "the silence ",
        "the silence o",
        "the silence of",
        "the silence of ",
        "the silence of t",
        "the silence of th",
        "the silence of the",
        "the silence of the ",
        "the silence of the l",
        "the silence of the la",
        "the silence of the lam",
        "the silence of the lamb",
        "the silence of the lambs",
        "j",
        "jo",
        "jon",
        "jona",
        "jonat",
        "jonath",
        "jonatha",
        "jonathan",
        "d",
        "de",
        "dem",
        "demm",
        "demme",
      ],
    },
    {
      Title: "Schindler's List",
      Plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      Genre: "Biography, Drama, History",
      Year: 1993,
      Director: "Steven Spielberg",
      Cast: "Liam Neeson, Ralph Fiennes, Ben Kingsley",
      Duration: "3h 15min",
      Rating: 4.9,
      Cover:
        "https://th.bing.com/th/id/R.5b0fef44796aa575f3a2be5f49a7dded?rik=1iVVhmppopopbg&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/7.15.23a story that’s been in the works for over a year now, can’t believe i’m finally putting it out soon.mp4",
      Size: "10mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "s",
        "sc",
        "sch",
        "schi",
        "schin",
        "schind",
        "schindl",
        "schindle",
        "schindler",
        "l",
        "li",
        "lis",
        "list",
        "r",
        "st",
        "ste",
        "stev",
        "steve",
        "steven",
        "sp",
        "spi",
        "spie",
        "spiel",
        "spielb",
        "spielbe",
        "spielber",
        "spielberg",
      ],
    },

    {
      Title: "Saving Private Ryan",
      Plot: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
      Genre: "Drama, War",
      Year: 1998,
      Director: "Steven Spielberg",
      Cast: "Tom Hanks, Matt Damon, Tom Sizemore",
      Duration: "2h 49min",
      Rating: 4.7,
      Cover:
        "https://th.bing.com/th/id/R.ca2392772abe4f0dc92eca96def53b40?rik=PLeo7SCasa15SQ&riu=http%3a%2f%2fimg.over-blog-kiwi.com%2f1%2f36%2f64%2f60%2f20150405%2fob_73f610_saving-private-ryan-poster-copy.jpg&ehk=eGvtbtNIP2NkmNfuPLedKKG46m0neKGIPs1r%2b74kU3o%3d&risl=&pid=ImgRaw&r=0",
      URL: "https://ojiesuwa.github.io/music/7.15.23a story that’s been in the works for over a year now, can’t believe i’m finally putting it out soon.mp4",
      Size: "11mb",
      Resolution: "1080p",
      Language: "English",
      QueryKey: [
        "s",
        "sa",
        "sav",
        "savi",
        "savin",
        "saving",
        "sa",
        "sav",
        "savi",
        "savin",
        "saving",
        "s",
        "sa",
        "sav",
        "save",
        "st",
        "ste",
        "stev",
        "steve",
        "steven",
        "sp",
        "spi",
        "spie",
        "spiel",
        "spielb",
        "spielbe",
        "spielber",
        "spielberg",
      ],
    },
    {
      Title: "Living in Bondage: Breaking Free",
      Plot: "Living in Bondage: Breaking Free is a 2019 Nigerian supernatural thriller film directed by Ramsey Nouah in his directorial debut. It is a sequel to the 1992 classic Living in Bondage. The film tells the story of Nnamdi Okeke, a young man who is introduced to the lifestyle of the rich and powerful.",
      Genre: "Drama, Thriller",
      Year: 2019,
      Director: "Ramsey Nouah",
      Cast: "Kenneth Okonkwo, Ramsey Nouah, Swanky JKA",
      Duration: "2h 30min",
      Rating: 4.5,
      Cover:
        "https://i0.wp.com/exoduscinemas.com/wp-content/uploads/2019/12/Living-In-Bondage-Poster.png?ssl=1",
      URL: "https://ojiesuwa.github.io/music/just uploaded a video where i attempt to switch up my style and go online thrift shopping! link in bio -).mp4",
      Size: "10mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "l",
        "li",
        "liv",
        "livi",
        "livin",
        "living",
        "living ",
        "living i",
        "living in",
        "living in ",
        "living in b",
        "living in bo",
        "living in bon",
        "living in bond",
        "living in bonda",
        "living in bondag",
        "living in bondage",
        "b",
        "br",
        "bre",
        "brea",
        "break",
        "breaki",
        "breakin",
        "breaking",
        "breaking ",
        "breaking f",
        "breaking fr",
        "breaking fre",
        "breaking free",
        "n",
        "no",
        "nou",
        "noua",
        "nouah",
        "r",
        "ra",
        "ram",
        "rams",
        "ramse",
        "ramsey",
        "r",
        "ra",
        "ram",
        "rams",
        "ramse",
        "ramsey",
        "n",
        "no",
        "nou",
        "noua",
        "nouah",
        "s",
        "sw",
        "swa",
        "swan",
        "swank",
        "swanky",
        "swanky ",
        "swanky j",
        "swanky jk",
        "swanky jka",
        "k",
        "ke",
        "ken",
        "kenn",
        "kenne",
        "kennet",
        "kenneth",
        "o",
        "ok",
        "oko",
        "okon",
        "okonk",
        "okonkw",
        "okonkwo",
      ],
    },
    {
      Title: "The Green Mile",
      Plot: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
      Genre: "Crime, Drama, Fantasy",
      Year: 1999,
      Director: "Frank Darabont",
      Cast: "Tom Hanks, Michael Clarke Duncan, David Morse",
      Duration: "3h 9min",
      Rating: 4.8,
      Cover:
        "https://th.bing.com/th/id/OIP.yLn8so2-dkfvDH8pp8BKZAHaLG?w=683&h=1024&rs=1&pid=ImgDetMain",
      URL: "https://ojiesuwa.github.io/music/just uploaded a video where i attempt to switch up my style and go online thrift shopping! link in bio -).mp4",
      Size: "9mb",
      Resolution: "720p",
      Language: "English",
      QueryKey: [
        "t",
        "th",
        "the",
        "the ",
        "the g",
        "the gr",
        "the gre",
        "the gree",
        "the green",
        "the green ",
        "the green m",
        "the green mi",
        "the green mil",
        "the green mile",
        "f",
        "fr",
        "fra",
        "fran",
        "frank",
        "d",
        "da",
        "dar",
        "dara",
        "darab",
        "darabo",
        "darabon",
        "darabont",
      ],
    },
  ];

  const formRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();
  const durationRef = useRef();
  const sizeRef = useRef();

  const [inputValues, setInputValue] = useState({});
  const [videoFile, setVideofile] = useState();
  const [videoFileUrl, setVideofileUrl] = useState(
    "https://th.bing.com/th/id/R.4d1b0ca9846c16446995a5eefd9cfe8c?rik=1%2flywCZwF2aAGw&pid=ImgRaw&r=0"
  );
  const [imageFileUrl, setImagefileUrl] = useState(
    "https://th.bing.com/th/id/R.4d1b0ca9846c16446995a5eefd9cfe8c?rik=1%2flywCZwF2aAGw&pid=ImgRaw&r=0"
  );
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImagefile] = useState();
  const [success, setSuccess] = useState(false);
  const [progressMessage, setProgressMessage] = useState();

  const navigate = useNavigate();

  function deductValues(e) {
    const formData = new FormData(formRef.current);
    const inputFields = {};

    formData.forEach((value, name) => {
      inputFields[name] = value;
    });

    return inputFields;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let fieldValues = deductValues(e);
    if (!validateInput(fieldValues)) {
      setNotification("Enter All Input Before Proceeding");
      return;
    }
    if (!imageFile || !videoFile) {
      setNotification("Enter both image and video before proceeding");
      return;
    }
    fieldValues.QueryKey = queryKeyGenerator([
      fieldValues.Title.toLowerCase(),
      fieldValues.Director.toLowerCase(),
    ]);
    fieldValues.Genre = fieldValues.Genre.split(",");
    fieldValues.Genre = fieldValues.Genre.map((value) => value.trimStart());
    fieldValues.Cast = fieldValues.Cast.split(",");
    fieldValues.Cast = fieldValues.Cast.map((value) => value.trimStart());
    console.log(fieldValues);
    uploadNewMovie(videoFile, imageFile, fieldValues, showProgress, () => {
      setProgressMessage(false);
      setSuccess(true);
    });
  }

  function handleInput(e) {
    setInputValue({ ...inputValues, [e.target.name]: e.target.value });
  }

  function addVideo() {
    fetchVideo().then((res) => {
      console.log(res.file);
      setVideofile(res.file);
      setVideofileUrl(res.url);
      sizeRef.current.value = `${res.size} Mb`;
    });
  }
  function addImage() {
    fetchImage().then((res) => {
      setImagefile(res.file);
      setImagefileUrl(res.url);
    });
  }

  function showProgress(data) {
    setProgressMessage(data);
  }

  async function uploadSample() {
    let promises = sampleMovies.map((movie) =>
      uploadNewMovie({}, {}, movie, {}, {})
    );

    await Promise.all(promises);
    setSuccess(true);
  }

  useEffect(() => {}, []);

  return (
    <div className="add-movie main">
      {notification && (
        <ModalNotification
          modalIcon={"fa-solid fa-circle-exclamation"}
          modalText={notification}
          modalActions={[
            {
              label: "Okay",
              action: () => {
                setNotification();
              },
            },
          ]}
          cancelAction={() => {
            setNotification();
          }}
        />
      )}
      {loading && <Loading />}
      {success && (
        <ModalNotification
          modalIcon={"fa-solid fa-smile"}
          modalText={
            "Your video has been successfully published, click ok to continue"
          }
          modalActions={[
            {
              label: "Okay",
              action: () => {
                setSuccess(false);
                navigate("/Admin");
              },
            },
          ]}
          cancelAction={() => {
            setSuccess(false);
          }}
        />
      )}
      {progressMessage && (
        <Message iconClass={"fa-solid fa-spinner"} message={progressMessage} />
      )}
      <div className="media-section anim-fade-right">
        <div className="add-vid">
          <video
            controls
            ref={videoRef}
            src={videoFileUrl}
            onLoadedMetadata={(e) => {
              durationRef.current.value = formatTime(e.target.duration);
            }}
          ></video>
        </div>
        <ActionIcon iconClass={"fa-solid fa-circle-plus"} onClick={addVideo} />
        <div className="add-img">
          <img ref={imageRef} src={imageFileUrl} alt="Add Cover Image Here" />
        </div>
        <ActionIcon iconClass={"fa-solid fa-circle-plus"} onClick={addImage} />
      </div>
      <div className="info-section">
        <h3>Enter every movie details below</h3>
        <p className="warning">
          Ensure to complete all fields before publishing!
        </p>
        <form
          className="input-field anim-fade-left"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie title..."
            name="Title"
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie genre...(write multiple genre separated by comma)"
            name="Genre"
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie cast...(write multiple cast separated by comma)"
            name="Cast"
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie plot..."
            name="Plot"
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie duration..."
            name="Duration"
            ref={durationRef}
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie director..."
            name="Director"
          />
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie language..."
            name="Language"
          />
          <select>
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="360p">360p</option>
            <option value="144p">144p</option>
          </select>
          <input
            required
            onInput={handleInput}
            type="text"
            placeholder="Movie size..."
            name="Size"
            ref={sizeRef}
          />
          <input
            required
            onInput={handleInput}
            type="number"
            placeholder="Movie release year..."
            name="Year"
          />
          <button type="submit">Publish Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
