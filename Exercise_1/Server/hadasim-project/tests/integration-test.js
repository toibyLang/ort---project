const baseUrl = "http://localhost:3000/api/members";

// ID ייחודי בן 9 ספרות כדי שהטסט לא יתנגש בהרצה קודמת
const testId = String(Date.now()).slice(-9);

const testMember = {
    firstName: "Test",
    lastName: "User",
    id: testId,
    address: {
        city: "TestCity",
        street: "TestStreet",
        houseNumber: "1"
    },
    dateOfBirth: "2000-01-01",
    phone: "021234567",
    cellphone: "0501234567",
    vaccinations: [],
    dateOfPositiveReply: null,
    recoveryDate: null
};

try {
    console.log("1. Testing POST...");

    const postResponse = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(testMember)
    });

    if (!postResponse.ok) {
        throw new Error(
            `POST failed with status ${postResponse.status}`
        );
    }

    console.log("POST passed");


    console.log("2. Testing GET...");

    const getResponse = await fetch(`${baseUrl}/${testId}`);

    if (!getResponse.ok) {
        throw new Error(
            `GET failed with status ${getResponse.status}`
        );
    }

    const member = await getResponse.json();

    if (member.id !== testId) {
        throw new Error("GET returned the wrong member");
    }

    console.log("GET passed");


    console.log("3. Testing DELETE...");

    const deleteResponse = await fetch(`${baseUrl}/${testId}`, {
        method: "DELETE"
    });

    if (!deleteResponse.ok) {
        throw new Error(
            `DELETE failed with status ${deleteResponse.status}`
        );
    }

    console.log("DELETE passed");

    console.log("");
    console.log("Integration test PASSED");

} catch (error) {
    console.error("");
    console.error("Integration test FAILED");
    console.error(error.message);
    process.exit(1);
}