

hello:
	@echo "Hello!"



seed:
	npx prisma db seed

generate:
	npx prisma generate

migrate:
	npx prisma migrate dev

migrate-reset:
	npx prisma migrate reset
	npx prisma db seed
