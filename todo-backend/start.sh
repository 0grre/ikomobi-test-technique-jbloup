if [ ! -f "/app/migrations.lock" ]; then
  echo "Running migrations and seeders..."
  npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
  touch /app/migrations.lock
else
  echo "Migrations and seeders already ran."
fi
