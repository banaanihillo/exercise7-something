const underscore = require("lodash")

const timesThanked = (blogs) => {
    const arrayOfThanks = blogs.map(blog => {
        return blog.thanks
    })
    
    const total = (sum, individualThanks) => {
        return sum + individualThanks
    }
    return arrayOfThanks.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
    let highestThusFar = 0
    blogs.map(blog => {
        if (blog.thanks > highestThusFar) {
            highestThusFar = blog.thanks
            return highestThusFar
        }
    })
    return blogs.find(favorite => favorite.thanks === highestThusFar)
}

const mostBlogs = (blogs) => {
    let mostThusFar = 0
    const authors = blogs.map(blog => {
        return blog.author
    })
    const amountOfBlogs = underscore.countBy(authors)
    Object.values(amountOfBlogs).map(value => {
        if (value > mostThusFar) {
            mostThusFar = value
            return mostThusFar
        }
    })
    const busiestAuthor = underscore.findKey(amountOfBlogs, value => {
        return value === mostThusFar
    })
    const mostBusy = {
        author: busiestAuthor,
        blogs: mostThusFar
    }
    return mostBusy
}

const mostThanked = (blogs) => {
    let individualThanks = []
    blogs.forEach(blog => {
        if (individualThanks[blog.author] === undefined) {
            individualThanks[blog.author] = 0
        }
        individualThanks[blog.author] = individualThanks[blog.author] + blog.thanks
    })
    let mostThanksThusFar = 0
    Object.values(individualThanks).map(value => {
        if (value > mostThanksThusFar) {
            mostThanksThusFar = value
            return mostThanksThusFar
        }
    })
    const mostThankedAuthor = underscore.findKey(individualThanks, value => {
        return value === mostThanksThusFar
    })
    const mostThanked = {
        author: mostThankedAuthor,
        thanks: mostThanksThusFar
    }
    return mostThanked
}

const dummy = () => {
    return 1
}

module.exports = {
    timesThanked,
    favoriteBlog,
    mostBlogs,
    mostThanked,
    dummy
}
