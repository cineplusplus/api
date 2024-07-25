import { main } from "./main";

test("Main Functions", () => {
  expect(main()).toBe("Example");
  // expect(main()).toBe(2);
});

/**
 * 
 * Whit SuperTest
 * describe('Audio Router Test /audio/**', () => {
  describe('GET /audio', () => {
    test('should response whit a 200 status code', async () => {
                         <--- Import of supertest --->
      const response = await request(app).get('/audio').send();
      expect(response.statusCode).toBe(200);
    });
  });
});
 */
