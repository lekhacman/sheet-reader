const xlsx = require("xlsx");
const sheetReader = require("./main");

describe("Book reader", function() {
  const book = xlsx.readFile("tests/test.xlsx");
  const worksheet = book["Sheets"]["students"];

  test("should return data", async function f() {
    const result = await sheetReader({
      columns: ["A", "b", "e"],
      begin: 2,
      end: 4,
      onData: function(entry) {
        expect(entry).toBeDefined();
      }
    })(worksheet);
    expect(result).toEqual([
      {
        A: 1,
        b: "andrew",
        e: "vn"
      },
      {
        A: 2,
        b: "le",
        e: "vn"
      },
      {
        A: 3,
        b: "khac man",
        e: "vn"
      }
    ]);
  });

  test("should accept columnMapper as argument", async function f() {
    const result = await sheetReader({
      columns: {
        A: "id",
        b: "name",
        e: "country"
      },
      begin: 2,
      end: 4,
      onData: function(entry) {
        expect(entry).toBeDefined();
      }
    })(worksheet);
    expect(result).toEqual([
      {
        id: 1,
        name: "andrew",
        country: "vn"
      },
      {
        id: 2,
        name: "le",
        country: "vn"
      },
      {
        id: 3,
        name: "khac man",
        country: "vn"
      }
    ]);
  });

  test("should auto end operation", async function f() {
    const result = await sheetReader({
      sheet: "students",
      columns: ["A", "b", "e"],
      begin: 2
    })(worksheet);
    expect(result.length).toEqual(10);
  });
});
