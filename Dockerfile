FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 80

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:80"]
