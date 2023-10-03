import datetime

currentDate = datetime.datetime.now()

print("Welcome to the seconds calculator... where you will find how many second old you are. Please input your information below.")

print("What year were you born?")
birthYear = int(input())

print("What month (1-12) were you born?")
birthMonth = int(input())

if birthMonth < 0 or birthMonth > 12:
    while birthMonth < 0 or birthMonth > 12:
        print('That is not a valid month. Please try again.')
        birthMonth = input()

print("What day were you born?")
birthDay = int(input())

if birthDay < 0 or birthMonth > 31:
    while birthMonth < 0 or birthMonth > 31:
        print('That is not a valid day. Please try again.')
        birthMonth = input()

userBorn = datetime.datetime(birthYear, birthMonth, birthDay)
#splitCurrentDate = datetime.datetime.strftime(currentDate, "%Y %b %d")
seconds = str(((currentDate - userBorn).days) * 86400)

print("You are " + seconds + " seconds old!")