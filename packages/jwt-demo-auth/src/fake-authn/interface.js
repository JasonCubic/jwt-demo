const bcrypt = require('bcryptjs');
const log = require('jwt-demo-logs');

function verifyAuthentication(username = '', password = '') {
  return new Promise((resolve, reject) => {
    if (!username || typeof username.valueOf() !== 'string' || username.length === 0) {
      reject(new Error('invalid username'));
      return;
    }
    if (!password || typeof password.valueOf() !== 'string' || password.length === 0) {
      reject(new Error('invalid password'));
      return;
    }
    // this is just a demo, never put real password hashes into version control.
    // In a real project replace this with some real authentication.
    const userCollection = [
      { username: 'ckent', displayName: 'Superman', passwordHash: '$2a$10$0df78qe7G6Er.iTIw7m3s.zY.XUv9eBHIAfwrhidOmSK5n0KrB9Ha' },
      { username: 'bwayne', displayName: 'Batman', passwordHash: '$2a$10$go2sylNDtOJliSUmf82LTO3XAgx5IY.PamXzL54FjCIhfHOr5kjJa' },
      { username: 'dprince', displayName: 'Wonder Woman', passwordHash: '$2a$10$W4Bb7zSoizqMKsbas.9s9.zaZubMzQ84pnHBJJUWtW7jMivqQG9Q2' },
      { username: 'ballen', displayName: 'The Flash', passwordHash: '$2a$10$VfaWyrGmt0hQT.qUceaCHu88xYJymCxwvsykgUWo9b.j/AyJgJpUi' },
      { username: 'hjordan', displayName: 'Green Lantern', passwordHash: '$2a$10$EDTft4.JHP9UWwMg4miCbuz1/yWZ0n1UxthfPZiPGX1HLhh7UgmQi' },
      { username: 'acurry', displayName: 'Aquaman', passwordHash: '$2a$10$fH68bM56GTkmdbZ5HmSdteiCnGU0CN7DPDO7tHnIPW2U05wtF6y8C' },
      { username: 'jjones', displayName: 'Martian Manhunter', passwordHash: '$2a$10$KsL7e8yaciZJO0pgylC6L.z.3DWhrSE8eRfM7M6Jzix431FatAJIm' },
    ];
    const userObj = userCollection.find((row) => row.username === username);
    if (!userObj) {
      log.info('auth failed cannot find user: ', username);
      reject(new Error('authentication failed')); // cannot find user
      return;
    }
    bcrypt.compare(password, userObj.passwordHash, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res === true) {
        resolve({ username: userObj.username, displayName: userObj.displayName });
        return;
      }
      reject(new Error('authentication failed')); // password invalid
    });
  });
}

module.exports = { verifyAuthentication };
