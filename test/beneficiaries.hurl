POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
header "X-Content-Type-Options" == "nosniff"
header "Access-Control-Allow-Credentials" == "true"
header "Accept-CH" exists
header "Referrer-Policy" == "strict-origin"
header "X-Frame-Options" == "deny"
header "Strict-Transport-Security" == "max-age=63072000; includeSubDomains; preload"
body contains "Vos coordonnées ont été enregistrées avec succès."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food:
notes:
HTTP 200
[Asserts]
body contains "Le champ coutume alimentaire est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: fdsfdsfds
notes:
HTTP 200
[Asserts]
body contains "Le champ coutume alimentaire est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone:
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ phone est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: fdsfds
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ téléphone est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: "fdsfds"
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ nombre de parts est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts:
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ parts est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode:
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ zipCode est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city:
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ city est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName: John
lastName:
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ lastName est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
HX-Request: true
[FormParams]
firstName:
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Le champ firstName est incorrect."

POST http://localhost:8000/beneficiaires/formulaire.html
User-Agent:
Accept-CH:
[FormParams]
firstName: John
lastName: Doe
address: 17 rue du moulin
complementary:
city: Douai
department: 59
zipCode: 59500
parts: 3
agreed: 1
phone: 0765456789
food: maghreb
notes:
HTTP 200
[Asserts]
body contains "Vous n'êtes pas autorisé à faire cette action !"
