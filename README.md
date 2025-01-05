# Kubernetes

Kubernetes, or K8s for short, is an open-source container-orchestration tool designed by Google. It’s used for bundling and managing clusters of containerized applications — a process known as ‘orchestration’ in the computing world.

# Kubernetes Concepts: Container, Pod, and Deployment

This document explains the differences between **Container**, **Pod**, and **Deployment** in Kubernetes.

| **Aspect**              | **Container**                                                   | **Pod**                                                               | **Deployment**                                                           |
|-------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Definition**           | A lightweight executable unit that contains an application.      | A group of one or more containers sharing the same resources.         | A higher-level resource for managing the lifecycle of Pods.               |
| **Components**           | Contains a single application or service.                       | Can contain one or more containers.                                  | Manages a set of Pods, ensuring the desired state and number of replicas. |
| **Resource Sharing**     | Containers are isolated but can communicate via shared volumes.  | Containers within the same Pod share networking and storage.         | No resource sharing directly; it ensures the correct number of Pods.      |
| **Use Case**             | Running a specific service or application.                      | Running closely related services together in the same network space. | Managing application scaling and updates through Pods.                    |
| **Scaling**              | Does not handle scaling.                                        | Scaling requires creating more Pods.                                 | Manages scaling by adjusting the number of Pods through replicas.         |
| **Lifecycle**            | Container lifecycle is tied to the Pod it runs in.               | A Pod's lifecycle is tied to the containers within it.               | A Deployment's lifecycle ensures the Pods are in the desired state.      |
| **Update Strategy**      | No built-in update strategy.                                    | Updates need to be managed manually (e.g., replacing Pods).           | Supports rolling updates to minimize downtime during application changes. |

# Kubernetes Concepts: Deployment vs ReplicaSet

| **Aspect**                | **Deployment**                                                                                                   | **ReplicaSet**                                                                                                    |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Definition**             | A higher-level resource that manages ReplicaSets and Pods, allowing for scaling, rolling updates, and rollbacks.   | A lower-level resource responsible for ensuring a specified number of identical Pods are running at all times.   |
| **Primary Function**       | Ensures the desired number of replicas of Pods are running, supports rolling updates, and handles application updates. | Ensures the specified number of Pods are running and handles pod scaling.                                         |
| **Use Case**               | Used for managing the deployment of applications with features like updates, rollbacks, and scaling.              | Used for maintaining a stable set of identical Pods by ensuring the number of Pods matches the desired state.    |
| **Updates**                | Supports rolling updates, allowing you to update Pods with zero downtime by gradually replacing old Pods with new ones. | Does not manage updates directly. If a new ReplicaSet is created, old Pods from the previous ReplicaSet are deleted. |
| **Rollback**               | Supports rollback to previous versions if the new deployment is problematic or needs reverting.                 | Does not natively support rollback. Rolling back requires creating a new ReplicaSet manually.                   |
| **Scaling**                | Handles scaling by adjusting the number of replicas of Pods and automatically managing the ReplicaSet.          | Directly handles scaling by ensuring the number of Pods in the ReplicaSet matches the desired state.            |
| **Controller**             | The Deployment controller manages ReplicaSets and ensures that Pods are in the desired state.                    | The ReplicaSet controller directly manages Pods and ensures the desired replica count is maintained.            |
| **Creation of ReplicaSets**| Automatically creates and manages ReplicaSets as part of the deployment process.                                 | ReplicaSets are created manually or as a result of a Deployment.                                                  |
| **Self-Healing**           | Automatically replaces Pods in the event of failure, ensuring the desired state is maintained.                   | Ensures that the correct number of Pods are running but does not handle application updates or rollbacks.         |
| **Declarative Management** | Supports declarative management, allowing users to define the desired state for both Pods and updates.           | Is declarative, but its management is focused solely on the number of Pods, not application-level management.     |

# Kubernetes Services

## What is a Kubernetes Service?

A **Kubernetes service** is an API object that enables communication between the **pods** and the network. It provides a stable network endpoint for accessing a group of pods. 

Since **pods** are ephemeral (they can be created and destroyed), their IP addresses can change every time they are recreated. However, a service has a **static IP address** that does not change, which makes it reliable for routing network traffic to the correct pod. When you want to expose a pod over the network, you assign a service to it, which routes external traffic to the appropriate pod.

---

## How Does a Kubernetes Service Work?

A service uses **labels** and **selectors** to identify which pods it should route traffic to. Services can be configured to target a **deployment**, which ensures that all pods created by the deployment are automatically exposed by the service.

A service can also be set to target multiple pods, as long as the correct labels are selected. This allows for flexible routing to different groups of pods.

---

## Components of Kubernetes Services

When defining a Kubernetes service, several key components must be configured in the service's YAML manifest. These components include:

### 1. **Label Selectors**
- Used to identify and select the correct pods or group of pods to route traffic to.

### 2. **ClusterIP**
- The **ClusterIP** is the internal IP address assigned to the service. This IP is accessible only within the Kubernetes cluster.

### 3. **Port**
- The **port** on which the service listens for external traffic.

### 4. **Target Port**
- The **target port** is the port on the pod where the application is running. Traffic from the service is routed to this port.

### 5. **Service Type**
- Specifies the **type** of service (e.g., ClusterIP, NodePort, LoadBalancer, etc.). We'll explore different service types in the next section.

### 6. **Protocol**
- Defines the **protocol** (TCP, UDP, or SCTP) that the service will use to handle the traffic.

---

## Kubernetes Service Types

This document explains the different types of Kubernetes services, their usage, and how they differ from one another.

### 1. ClusterIP

#### Description:
- **ClusterIP** is the default service type in Kubernetes.
- It assigns a **private IP address** to the service, which is **only accessible within the Kubernetes cluster**.

#### Access:
- Only other services inside the same cluster can access this service.

#### Use Cases:
- Communication between different parts of your application within the same cluster.
- Example: Front-end service talking to back-end service.

### Image Example:
![ClusterIP](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/ClusterIP.png?raw=true)

---

### 2. NodePort

#### Description:
- **NodePort** is an extension of the **ClusterIP** service type.
- It exposes the service to the **outside world** by opening a specific port on each **node** in the cluster.
- You can access the service from outside the cluster using `<NodeIP>:<NodePort>`.

#### Access:
- External traffic can reach your service by connecting to a node's IP and the assigned port.

#### Port Range:
- The NodePort port range is **30000-32767**. Kubernetes will automatically assign a port, but you can also manually choose a port within this range.

#### Use Cases:
- When you want to expose your service outside the cluster.
- Useful for custom load balancing or environments not fully supported by Kubernetes.

#### Image Example:
![NodePort](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/NodePort.png?raw=true)

---

### 3. LoadBalancer

#### Description:
- **LoadBalancer** is an extension of the **NodePort** service type.
- It integrates with cloud providers (like AWS, GCP, Azure) to create an external **load balancer** for your service.
- A cloud provider will automatically set up the load balancer and assign it a public IP address.

#### Access:
- The load balancer automatically distributes traffic to the backend Pods of your service, and you can access the service via a cloud-provided IP.

#### Use Cases:
- When you are using a cloud provider to host your Kubernetes cluster.
- Ideal for applications requiring external access with automatic load balancing.

#### Image Example:
![LoadBalancer](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/LoadBalancer.png?raw=true)

---
# Ingress in Kubernetes

## What is Ingress?

In Kubernetes, **Ingress** is a way to manage access to your applications from outside the Kubernetes cluster. It controls how external traffic (like users visiting your website) can reach your services inside the cluster. Ingress makes it easier to expose multiple services using just **one** entry point instead of creating separate URLs for each service.

### Why is Ingress Needed?

#### 1. **Manage Traffic Easily**

Without Ingress, each service would need its own external endpoint (e.g., IP address or port). This can become messy. Ingress gives you a **single entry point** for all your services, simplifying traffic management.

#### 2. **Route Traffic Based on URL**

You can tell Ingress to send traffic to different services based on the URL path. For example:
- Requests to `example.com/service1` go to **Service 1**
- Requests to `example.com/service2` go to **Service 2**

#### 3. **SSL/TLS (HTTPS) Encryption**

Ingress can handle HTTPS traffic (secure communication). This means all the traffic to your website can be encrypted (HTTPS), improving security. Ingress manages the certificates, so you don't have to do it for each individual service.

#### 4. **Load Balancing**

Ingress can balance traffic between different servers or containers running the same service. This helps your app handle more visitors and stay available if one server fails.

#### 5. **Security Features**

You can use Ingress to protect your services. For example, you can set up basic authentication, block traffic from certain IP addresses, or limit the number of requests a user can make.

#### 6. **Save Costs**

By using one entry point for multiple services, you reduce the number of public IP addresses or load balancers you need, saving resources and money.

## Difference Between Ingress, Ingress Service, and Ingress Controller

### 1. **Ingress**

- **What it is**: An **Ingress** is an API object in Kubernetes that defines how external traffic should reach the services inside the cluster. It contains the rules that define the routing logic based on things like hostname and URL path.
- **What it does**: It controls the flow of external requests to various services inside the Kubernetes cluster, typically using HTTP/HTTPS.

### 2. **Ingress Service**

- **What it is**: There isn't really a "Ingress Service" as a separate entity. However, the **Ingress** resource often references services inside the cluster (which can be a regular Kubernetes Service).
- **What it does**: When defining routing rules in an Ingress, you direct traffic to specific Kubernetes Services. A Service in Kubernetes exposes a set of pods, and the Ingress routes traffic to those Services based on the rules you define.

### 3. **Ingress Controller**

- **What it is**: An **Ingress Controller** is a piece of software that reads the Ingress resources in your cluster and actually implements the routing logic. It listens for incoming HTTP/HTTPS requests and forwards them to the appropriate service as defined in the Ingress.
- **What it does**: The Ingress Controller is responsible for processing the rules specified in Ingress resources and managing the traffic flow. It works as a load balancer and traffic manager, making sure requests are routed correctly to the Services.

