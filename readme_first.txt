gcloud config set project bot-teamupschool
storage bucket name is bucket-teamupschool


gcloud beta functions deploy helloHttp  --stage-bucket bucket-teamupschool  --trigger-http 
gcloud beta functions describe helloHttp
gcloud beta functions call helloHttp 
gcloud beta functions logs read


git remote add origin https://github.com/meera/bot-teamup.git