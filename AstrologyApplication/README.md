# Astrology Application

This **Astrology Application** is a web-based platform built using **Angular** that provides astrological insights and predictions. The application is deployed on an **Amazon EKS (Elastic Kubernetes Service)** cluster and exposed to the outside world using **Ingress** and the **ALB (Application Load Balancer) Ingress Controller**.

## Features

- Built with **Angular** for the frontend.
- Deployed on **Amazon EKS**.
- Exposed using **ALB Ingress Controller**.
- Uses **Ingress resources** for routing external traffic to the app.

## Setup & Deployment

### Step 1: Build the Docker Image

```
docker build -t astrology-app .
```

### Step 2: Push image into Dockerhub

```
docker push astrology-app .
```

### Step 3: create cluster using fargate

```
eksctl create cluster --name demo-cluster --region us-east-1 --fargate
```

### Step 4: Check if there is an IAM OIDC provider configured already

If not, run the below command

```
eksctl utils associate-iam-oidc-provider --cluster $cluster_name --approve
```

### Step 4: Create Fargate profile

```
eksctl create fargateprofile \
    --cluster demo-cluster \
    --region eu-central-1 \
    --name alb-app \
    --namespace astrology-project
```

### Step 5: Deploy the deployment, service and Ingress

```
kubectl apply -f https://raw.githubusercontent.com/SupriyaKarnati/KubernetesProjects/refs/heads/main/Astrology.yaml
```

### Step 6: How to setup alb add on

#### Step 1: Download IAM policy

```
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
```

#### Step 2: Create IAM Policy

```
aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json
```

#### Step 2: Create IAM Role

```
eksctl create iamserviceaccount \
  --cluster=<your-cluster-name> \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --attach-policy-arn=arn:aws:iam::<your-aws-account-id>:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
```

### Step 7: Deploy ALB controller

#### Step 1: Add helm repo

```
helm repo add eks https://aws.github.io/eks-charts
```

#### Step 2: Update the repo

```
helm repo update eks
```

#### Step 3: Install

```
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \            
  -n kube-system \
  --set clusterName=<your-cluster-name> \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=<region> \
  --set vpcId=<your-vpc-id>
```

#### Step 4: Verify that the deployments are running.

```
kubectl get deployment -n kube-system aws-load-balancer-controller
```

# Final Application

![LoadBalancer]


