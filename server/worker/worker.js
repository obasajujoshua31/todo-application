import kue from "kue";
import sendEmail from "./email/email";

const queue = kue.createQueue();

queue.on("job enqueue", () => {
  console.log("Job Submitted in the queue");
});

queue.process("send-verification-email", (job, done) => {
  console.log(`Working on a job : ${job.id}`);
  console.log(job.data);
  const { email, url } = job.data;
  sendEmail(email, url);
  done();
});

export default queue;
