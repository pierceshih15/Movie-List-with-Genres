// 宣告 API 網址變數
const BASE_URL = 'https://movie-list.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/v1/movies'
const POSTERS_URL = BASE_URL + 'posters/'

// 宣告變數 for createGenresList() and displayMovieContent()
const genresList = document.getElementById('genres-list-tab');
const displayMovie = document.getElementById('displayMovie');

// 宣告共用變數
let data = [];
let filterMovies = [];
let genresNumber = 1; // 預設為 Action 

// 宣告電影分類清單
const genresName = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}

// 讓使用者點擊後，網頁呈現相對應的資料
genresList.addEventListener('click', (e) => {
    // 取出分類標籤的數字
    genresNumber = Number(e.target.dataset.number);
    // 將鎖定的標籤數字放入 displayMovieContent 函式，呈現畫面結果
    displayMovieContent(genresNumber);
})

// Step 1：初始狀態
getAPIdata()
createGenresList()

// Step 2：取得 API 資料
function getAPIdata() {
    axios.get(INDEX_URL)
        .then((response) => {
            // 以共用變數 data 儲存
            let APIdata = response.data.results
            data = APIdata;
            // 初始化頁面，預設為 Action 分類
            displayMovieContent(genresNumber)
        })
        .catch((err) => {
            console.log(err);
        });
}

// Step 3：創建左側分類清單
function createGenresList() {
    let htmlContent = ''
    for (i = 1; i < 20; i++) {
        htmlContent +=
            `<a class="list-group-item list-group-item-action" id="list-${genresName[i]}-list" data-toggle="list" href="#list-${genresName[i]}" role="tab" aria-controls="${genresName[i]}" data-number="${[i]}">${genresName[i]}</a>`
    }
    genresList.innerHTML = htmlContent;
}

// Step 4：顯示右側分類後的電影資料
function displayMovieContent(genresNumber) {

    // Use filter to get the movies by Genres
    let filterData = data.filter(function (item) {
        return item.genres.includes(genresNumber)
    });

    // 防呆機制，增加使用者體驗
    // 若有分類資料為空時，提醒使用者，並顯示該分類為空的頁面
    if (filterData.length == 0) {
        let htmlContent = '';
        displayMovie.innerHTML = htmlContent;
        alert('目前無此分類的資料內容，請選擇其餘分類進行查看')
    } else {
        // 反之，則正常顯示畫面

        filterMovies = filterData;
        // console.log('分類後的電影資料', filterMovies);

        let htmlContent = '';

        filterMovies.forEach(item => {
            // 處理圖片和電影名稱
            htmlContent += `
            <div class="d-inline-block col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card">
                    <img src="${POSTERS_URL}${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body px-1 text-center">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <div class="card-footer alert-light px-3">
            `

            // 處理分類標籤
            for (value of item.genres) {
                htmlContent += `
            <small class="text-muted fz-3 d-inline-block alert-dark p-1 mr-1 my-1">#${genresName[value]}</small>
            `
            }

            // HTML結尾標籤
            htmlContent += `
                    </div>
                </div>
            </div>
            `

            // 最終，將資料逐一加入 id 為 displayMovie的HTML標籤
            displayMovie.innerHTML = htmlContent;
        })
    }
}