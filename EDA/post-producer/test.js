import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 500,
  duration: '30s',
  cloud: {
    // Project: Default project
    projectID: 3730036,
    // Test runs with the same name groups test runs together.
    name: 'EDA Testing'
  }
};

export default function() {
    http.post('http://localhost:3000/create-post', JSON.stringify({
        title: 'Test',
        content: 'Test'
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    sleep(1);
}