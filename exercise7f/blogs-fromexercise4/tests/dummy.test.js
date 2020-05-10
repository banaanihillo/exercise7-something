const tester = require("../utils/tester")

test("The return value for this test will be 1", () => {
    const blogs = []
    const result = tester.dummy(blogs)
    expect(result).toBe(1)
})
