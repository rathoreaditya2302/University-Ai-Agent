import csv
import os
from database import SessionLocal, engine
from models import Base, Course, ExamSchedule, HostelInfo, PlacementData, GeneralInfo


DATA_DIR = os.path.join(os.path.dirname(__file__), "data")


def load_csv(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # --- Courses ---
    for row in load_csv("courses.csv"):
        db.add(Course(
            id=int(row["id"]),
            name=row["name"].strip(),
            branch_code=row["branch_code"].strip(),
            degree=row["degree"].strip(),
            duration_years=int(row["duration_years"]),
            fee_per_year=int(row["fee_per_year"]),
            total_fee=int(row["total_fee"]),
            eligibility=row["eligibility"].strip(),
            keywords=row["keywords"].strip(),
        ))
    print("✅ Courses seeded")

    # --- Exam Schedule ---
    for row in load_csv("exam_schedule.csv"):
        db.add(ExamSchedule(
            id=int(row["id"]),
            academic_year=row["academic_year"].strip(),
            semester=row["semester"].strip(),
            exam_type=row["exam_type"].strip(),
            start_date=row["start_date"].strip(),
            end_date=row["end_date"].strip(),
            notes=row["notes"].strip(),
        ))
    print("✅ Exam schedule seeded")

    # --- Hostel ---
    for row in load_csv("hostel.csv"):
        db.add(HostelInfo(
            id=int(row["id"]),
            hostel_type=row["hostel_type"].strip(),
            fee_per_year=int(row["fee_per_year"]),
            facilities=row["facilities"].strip(),
            mess_timings=row["mess_timings"].strip(),
            notes=row["notes"].strip(),
        ))
    print("✅ Hostel info seeded")

    # --- Placements ---
    for row in load_csv("placements.csv"):
        db.add(PlacementData(
            id=int(row["id"]),
            year=row["year"].strip(),
            avg_package_lpa=float(row["avg_package_lpa"]),
            highest_package_lpa=float(row["highest_package_lpa"]),
            total_offers=int(row["total_offers"]),
            top_companies=row["top_companies"].strip(),
            notes=row["notes"].strip(),
        ))
    print("✅ Placement data seeded")

    # --- General Info ---
    for row in load_csv("general_info.csv"):
        db.add(GeneralInfo(
            id=int(row["id"]),
            category=row["category"].strip(),
            key=row["key"].strip(),
            value=row["value"].strip(),
            keywords=row["keywords"].strip(),
        ))
    print("✅ General info seeded")

    db.commit()
    db.close()
    print("\n🚀 All tables seeded successfully!")


if __name__ == "__main__":
    seed()