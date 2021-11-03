import mongoose from 'mongoose'

const UsersNotificationsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, 'Введите Id сотрудника'] },
    notificationId: {
      type: String,
      required: [true, 'Введите Id уведомления'],
    },
  },
  { timestamps: true }
)

export default mongoose.modelsUsersNotifications ||
  mongoose.model('UsersNotifications', UsersNotificationsSchema)
