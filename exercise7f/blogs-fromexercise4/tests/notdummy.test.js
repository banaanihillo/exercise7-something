const tester = require("../utils/tester")

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        thanks: 7
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        thanks: 5
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        thanks: 12
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        thanks: 10
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        thanks: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        thanks: 0
    },
    {
        _id: "a7fa67ftg6a7fg6a7fgafgafyia6fgaifg6a",
        title: "Not a Real Blog",
        author: "Question Mark",
        url: "blackhole://vacuum",
        thanks: -0
    }
]

describe("Thanks given", () => {
    const individualBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            thanks: 7
        }
    ]

    test("to an empty list is 0", () => {
        const result = 0
        expect(result).toBe(0)
    })

    test("to one blog is the amount of thanks given to that individual blog", () => {
        const result = tester.timesThanked(individualBlog)
        expect(result).toBe(7)
    })

    test("to a list of blogs is the amount of thanks combined", () => {
        const result = tester.timesThanked(blogs)
        expect(result).toBe(34)
    })
})

describe("Favorite blog", () => {
    test("among an array of blogs is the blog that has been thanked the most", () => {
        const result = tester.favoriteBlog(blogs)
        console.log(`Most thanked:
            Title: ${result.title}
            Author: ${result.author}
            Times thanked: ${result.thanks}`)
        expect(result.thanks).toEqual(12)
    })
})

describe("Busiest author", () => {
    test("within a collection of blogs is the author whose name appears most often", () => {
        const result = tester.mostBlogs(blogs)
        console.log("Most blogs written:", result)
        expect(result.blogs).toEqual(3)
    })
})

describe("Most thanked author", () => {
    test("is the author whose blogs have been thanked the most", () => {
        const result = tester.mostThanked(blogs)
        console.log("Most thanks combined:", result)
        expect(result.thanks).toEqual(17)
    })
})
