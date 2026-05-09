def build_context(category: str, rows: list) -> str:
    if not rows:
        return ""

    if category == "courses":
        context = "Available Courses and Fee Structure at SRM:\n\n"
        for r in rows:
            context += (
                f"Course: {r.name} ({r.branch_code})\n"
                f"Degree: {r.degree} | Duration: {r.duration_years} years\n"
                f"Fee per Year: ₹{r.fee_per_year:,} | Total Fee: ₹{r.total_fee:,}\n"
                f"Eligibility: {r.eligibility}\n\n"
            )

    elif category == "exams":
        context = "Exam Schedule at SRM:\n\n"
        for r in rows:
            context += (
                f"Academic Year: {r.academic_year} | Semester: {r.semester.capitalize()}\n"
                f"Exam Type: {r.exam_type.capitalize()}\n"
                f"Start Date: {r.start_date} | End Date: {r.end_date}\n"
                f"Notes: {r.notes or 'N/A'}\n\n"
            )

    elif category == "hostel":
        context = "Hostel Information at SRM:\n\n"
        for r in rows:
            context += (
                f"Hostel Type: {r.hostel_type.capitalize()}\n"
                f"Fee per Year: ₹{r.fee_per_year:,}\n"
                f"Facilities: {r.facilities}\n"
                f"Mess Timings: {r.mess_timings or 'N/A'}\n"
                f"Notes: {r.notes or 'N/A'}\n\n"
            )

    elif category == "placements":
        context = "Placement Data at SRM:\n\n"
        for r in rows:
            context += (
                f"Year: {r.year}\n"
                f"Average Package: ₹{r.avg_package_lpa} LPA\n"
                f"Highest Package: ₹{r.highest_package_lpa} LPA\n"
                f"Total Offers: {r.total_offers or 'N/A'}\n"
                f"Top Companies: {r.top_companies}\n"
                f"Notes: {r.notes or 'N/A'}\n\n"
            )

    elif category in ("admissions", "general"):
        context = "General Information at SRM:\n\n"
        for r in rows:
            context += f"{r.key}: {r.value}\n\n"

    else:
        context = "\n".join([str(r) for r in rows])

    return context.strip()