var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBZyHFtbbMbiHJqHf-BjL5F2GVrqn_xqsAgF_UaKeb5CpjZ1PZ4PyKwoRXoMyt9H2-UwmBb99mQ-mG1AGxXT_XM",
   "privateKey": "gx3x5VXoIP8ghnbmKeK5AvEAJekKFCs2qVexg2qVbDM"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": " https://fcm.googleapis.com/fcm/send/c7i7fwDFM_k:APA91bHRfxrhyIy0D-iHchQ6LOXHrLWwrc-QzC7yCWrKUJ7j56C_SejvKOjUNVjAUOQ6n5C8MMwFwHnVfg5A7d03TbKqz9MfuJ43A2h5w4gmDkeFUAGSmGw3-aCHzVhu-ALjOtYeISBJ",
   "keys": {
       "p256dh": "BFQ5PG2DJ0RdUxlX0F8fkUppjsgUGFpzH9W/MU0f8dsFRnenmH4UJzDYK3LD/SnxgVeWj7G5YeR7JVEnWGrDqak=",
       "auth": "94ICr0TdU6UxU75Hd4+Vug=="
   }
};
var payload = 'Hai PSport Lovers !';
 
var options = {
   gcmAPIKey: '50868149632',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);