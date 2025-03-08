export default {
    testEnvironment: "node",
    transform: {
        "^.+\\.js": "babel-jest"
    },
    setupFilesAfterEnv: ["./tests/setupTests.js"],
};