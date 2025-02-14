import sendMailer from "#root/src/modules/users/helpers/send-email/send-email.js";

/**
 *
 * @scoop {user}
 * @params {job} menetukan job queue email
 * @params {done} menetukan callback queue email
 * @description fungsi worker queue email
 * @return {object} data
 *
 */

export const emailWorker = async (job, done) => {
  const { from, to, subject, content } = job.data;

  try {
    const result = await sendMailer(from, to, subject, content);

    if (result) {
      job.progress(100);

      done(null, { success: true, to });
      return;
    }
  } catch (error) {
    done(new Error(`Failed to send email: ${error.message}`));
  }
};
