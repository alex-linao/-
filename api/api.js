import http from '../utils/http'

export const login = (params) => http.post(`/login`, params)
export const logout = () => http.delete(`/logout`)
export const register = (params) => http.post(`/register`, params)
export const sendCode = (params) => http.post(`/verificationCodes`, params)


export const getCover = () => http.get(`/movie/cover?type=minp`)	// 获取首页封面图
export const getIndex = () => http.get(`/index?type=minp`)
export const search = (params) => http.get('/search', params)

export const getMovies = (params) => http.get('/movies', params)
export const getMovie = (id) => http.get(`/movies/${id}`)
export const getMovieComments = (id, params) => http.get(`/movies/${id}/comments`, params)
export const getMoviesToday = (params) => http.get(`/movie/today`, params)
export const getMoviesComing = (params) => http.get(`/movie/coming`, params)
export const getMoviesTheater = (params) => http.get(`/movie/theater`, params)
export const getMoviesTop = (params) => http.get(`/movie/top`, params)
export const getMoviesAward = (term) => http.get(`/awards/oscar/${term}`)


export const getMoviePhotos = (id, params) => http.get(`/movies/${id}/photos`, params)


export const getReviews = (id, params) => http.get(`/movies/${id}/reviews`, params)
export const getReview = (id) => http.get(`/reviews/${id}`)
export const getReviewComments = (id, params) => http.get(`/reviews/${id}/comments`, params)



export const getVideos = () => http.get('/videos')
export const getVideo = (id) => http.get(`/videos/${id}`)
export const getVideoComments = (id, params) => http.get(`/videos/${id}/comments`, params)


export const getArticles = (params) => http.get('/articles', params)
export const getArticle = (id) => http.get(`/articles/${id}`)
export const getArticleComments = (id, params) => http.get(`/articles/${id}/comments`, params)


export const getMovieActors = (id) => http.get(`/movies/${id}/casts`)

export const getActor = (id) => http.get(`/casts/${id}`)
export const getActorPhotos = (id, params) => http.get(`/casts/${id}/photos`, params)
export const getActorWorks = (id, params) => http.get(`/casts/${id}/works`, params)


export const report = (id, params) => http.post(`/report/${id}`, params)

export const getMyInfo = () => http.get(`/user`)
export const updateMyInfo = (params) => http.put(`/user`, params)
export const getMyMovies = (params) => http.get(`/user/movies`, params)
export const deleteMyMovie = (id) => http.delete(`/user/movies/${id}`)
export const getMyVideos = (params) => http.get(`/user/videos/saves`, params)
export const getMyArticles = (params) => http.get(`/user/articles/saves`, params)
export const getMyActors = (params) => http.get(`/user/actors/saves`, params)

export const updateMyActor = (id, params) => http.post(`/user/casts/${id}`, params)

// 我的收藏夹
export const getMyFavorites = () => http.get(`/user/favorites`)
export const createMyFavorite = (params) => http.post(`/user/favorite`, params)
export const updateMyFavorite = (id, params) => http.put(`/user/favorite/${id}`, params)
export const deleteMyFavorite = (id, params) => http.delete(`/user/favorite/${id}`, params)
export const getMyFavoriteMovies = (id, params) => http.get(`/user/favorites/${id}/movies`, params)

export const getMyMovieFavorites = (id, params) => http.get(`/user/movies/${id}/favorites`, params)
export const saveMyFavoriteMovies = (id, params) => http.post(`/user/movies/${id}/favorites`, params)
export const deleteMyFavoriteMovie = (id, params) => http.delete(`/user/movies/${id}/favorites`, params)

export const aboutUs = () => http.get(`/aboutus?type=miniprogram`)
export const getSchools = (params) => http.get(`/schools/search`, params)
export const createSuggest = (params) => http.post(`/user/suggest`, params)


export const upload = (filePath, name, formData) => http.upload(`/user/upload`, filePath, name, formData)

// 点赞与点踩
export const createLike = (type, id) => http.post(`/${type}/${id}/like`)
export const deleteLike = (type, id) => http.delete(`/${type}/${id}/like`)

export const createRating = (id, params) => http.post(`/user/movies/${id}/rating`, params)