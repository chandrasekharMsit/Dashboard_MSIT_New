from dotenv import load_dotenv
from oauth2client.service_account import ServiceAccountCredentials
import sys
import os
import gspread
from flask import jsonify

sys.path.append('C:/Python39/Lib/site-packages')


load_dotenv()


def get_worksheet(worksheet_name):
    if worksheet_name=="urls_sheet":
        sheet_url = os.getenv(worksheet_name)
    else:
        sheet_url=get_sheet_url(worksheet_name)

    if sheet_url is None:
        return None
    creds_path = "./credentials.json"
    credential = ServiceAccountCredentials.from_json_keyfile_name(creds_path,
                                                                  ["https://spreadsheets.google.com/feeds",
                                                                   "https://www.googleapis.com/auth/spreadsheets",
                                                                   "https://www.googleapis.com/auth/drive.file",
                                                                   "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    worksheet = client.open_by_url(sheet_url)
    worksheet = worksheet.get_worksheet(0)
    return worksheet


def get_sheet_url(sheet_name):
    creds_path = "./credentials.json"
    credential = ServiceAccountCredentials.from_json_keyfile_name(creds_path,
                                                              ["https://spreadsheets.google.com/feeds",
                                                               "https://www.googleapis.com/auth/spreadsheets",
                                                               "https://www.googleapis.com/auth/drive.file",
                                                               "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    sheet_url = os.getenv('urls_sheet')
    worksheet = client.open_by_url(sheet_url)
    worksheet = worksheet.get_worksheet(0)
    values = worksheet.get_all_values()
    for row in values[1:]:
        if row[0] == sheet_name:
            return row[1]
    return None

def create_xlsx_sheet(sheet_name):
    creds_path = "./credentials.json"
    credential = ServiceAccountCredentials.from_json_keyfile_name(creds_path,
                                                              ["https://spreadsheets.google.com/feeds",
                                                               "https://www.googleapis.com/auth/spreadsheets",
                                                               "https://www.googleapis.com/auth/drive.file",
                                                               "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    spreadsheet = client.create(sheet_name)
    email_addresses = ['dashboard@dashboard-msit.iam.gserviceaccount.com']
    for mail in email_addresses:
        spreadsheet.share(mail, perm_type='user', role='writer')
    spreadsheet_url = spreadsheet.url
    print("Spreadsheet URL:", spreadsheet_url)
    return spreadsheet_url


def validate_fields(name, id_number, phone_number, email):
    if not name:
        return False
    if any(char.isdigit() for char in name):
        return False
    if not str(id_number).isdigit():
        return False
    phone_number_str = str(phone_number)
    if not phone_number_str.isdigit():
        return False
    if len(phone_number_str) != 10:
        return False
    if not email.endswith('@msitprogram.net'):
        return False
    return True


def validate_data(data, worksheet):
    existing_emails = [row[1].lower() for row in worksheet.get_all_values()]
    added_users = []
    unadded_users = []

    if isinstance(data, dict):
        if all(key in data for key in ('name', 'email', 'id_number', 'phone_number', 'role')) and (data.get('role') != 'student' or ("batch" in data and data.get('batch').strip())):
            email = data.get('email')
            if email and email.lower() not in existing_emails and validate_fields(data.get("name"), data.get("id_number"), data.get("phone_number"), email):
                added_users.append(list(data.values()))
            else:
                unadded_users.append(list(data.values()))
        else:
            unadded_users.append(list(data.values()))

    elif isinstance(data, list):
        for entry in data:
            email = entry.get('email')
            if all(key in entry for key in ('name', 'email', 'id_number', 'phone_number', 'role')) and (entry.get('role') != 'student' or ("batch" in data and entry.get('batch').strip())):
                if email and email.lower() not in existing_emails and validate_fields(entry.get("name"), entry.get("id_number"), entry.get("phone_number"), email):
                    added_users.append(list(entry.values()))
                else:
                    unadded_users.append(list(entry.values()))
            else:
                unadded_users.append(list(entry.values()))
    else:
        return jsonify({'error': 'Invalid data format'})

    return added_users, unadded_users

