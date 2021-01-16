apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/component: checker
    app.kubernetes.io/name: pumba-checker
    app.kubernetes.io/part-of: pumba
    app.kubernetes.io/managed-by: argocd
  name: pumba-checker
  namespace: pumba
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: pumba-checker
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app.kubernetes.io/name: pumba-checker
    spec:
      containers:
      - image: gcr.io/GOOGLE_CLOUD_PROJECT/pumba-checker:COMMIT_SHA
        name: pumba-checker
        ports:
        - containerPort: 5000
          protocol: TCP
        resources:
          requests:
              memory: "50Mi"
              cpu: "50m"
          limits:
              memory: "250Mi"
              cpu: "250m"
