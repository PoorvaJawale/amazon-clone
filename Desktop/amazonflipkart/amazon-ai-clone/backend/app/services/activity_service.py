from app.models.activity import UserActivity


def log_activity(
    db,
    user_id,
    product_id,
    action_type
):

    activity = UserActivity(
        user_id=user_id,
        product_id=product_id,
        action_type=action_type
    )

    db.add(activity)
    db.commit()