# Kubernetes Overview

Kubernetes (K8s) is an open-source container orchestration platform developed by Google. It is used to manage clusters of containerized applications, automating deployment, scaling, and operations.

## Key Kubernetes Concepts: Container, Pod, and Deployment

This section explains the differences between **Container**, **Pod**, and **Deployment**.

| **Aspect**            | **Container**                                    | **Pod**                                             | **Deployment**                                           |
|-----------------------|--------------------------------------------------|-----------------------------------------------------|---------------------------------------------------------|
| **Definition**         | A lightweight executable unit that runs an app.  | A group of one or more containers sharing resources. | Manages the lifecycle of Pods and ensures the desired state. |
| **Components**         | Contains a single application or service.        | Contains one or more containers.                    | Manages Pods, ensuring they are running as expected.     |
| **Resource Sharing**   | Isolated, but can communicate via shared volumes. | Containers within the same Pod share networking/storage. | Does not directly handle resources but manages Pods.     |
| **Use Case**           | Running a specific application or service.       | Running related services in the same network space. | Managing application scaling and updates via Pods.      |
| **Scaling**            | No built-in scaling mechanism.                   | Scale by creating more Pods.                        | Automatically scales Pods by adjusting replica count.   |
| **Lifecycle**          | Tied to the Pod lifecycle it runs in.            | Tied to containers within the Pod.                  | Manages the lifecycle of Pods and updates.              |
| **Update Strategy**    | No native update strategy.                       | Updates need to be handled manually.                | Supports rolling updates to replace Pods seamlessly.    |

---

## Kubernetes: Deployment vs ReplicaSet

| **Aspect**              | **Deployment**                                         | **ReplicaSet**                                           |
|-------------------------|-------------------------------------------------------|---------------------------------------------------------|
| **Definition**           | Manages ReplicaSets and Pods, supporting updates and rollbacks. | Ensures a specified number of identical Pods are running. |
| **Primary Function**     | Manages Pod scaling, updates, and rollbacks.           | Ensures a fixed number of Pods are running at all times.  |
| **Updates**              | Supports rolling updates with zero downtime.           | No built-in update mechanism; manual ReplicaSet creation required. |
| **Rollback**             | Supports rollbacks to previous versions.               | Does not support native rollbacks.                       |
| **Scaling**              | Scales Pods by adjusting the number of replicas.       | Directly manages the scaling of Pods.                    |
| **Controller**           | The Deployment controller manages ReplicaSets.         | The ReplicaSet controller ensures Pod replica consistency.|
| **Self-Healing**         | Automatically replaces failed Pods.                    | Ensures the right number of Pods are running.            |
| **Creation of ReplicaSets** | Automatically creates ReplicaSets during deployment. | ReplicaSets can be created manually.                     |

---

## What is a Kubernetes Service?

A **Kubernetes Service** is an abstraction that allows communication between Pods and the external network. It provides a stable IP address to route traffic to the Pods, which are often ephemeral and have dynamic IPs.

### How Does a Kubernetes Service Work?

- **Labels and Selectors**: Services route traffic to Pods based on labels.
- **Targeting Deployments**: Services can target Deployments, ensuring that all Pods created by the Deployment are automatically exposed.
- **Multiple Pods**: A service can route traffic to multiple Pods based on selectors, enabling flexible routing.

### Key Components of a Kubernetes Service

- **Label Selectors**: Used to select the Pods to which the service should route traffic.
- **ClusterIP**: The internal IP assigned to the service, only accessible within the cluster.
- **Port & Target Port**: The service port that handles incoming traffic and the target port on the Pod where the app runs.
- **Service Type**: Defines whether the service is accessible externally or internally (e.g., ClusterIP, NodePort, LoadBalancer).
- **Protocol**: Defines whether the service uses TCP, UDP, or SCTP.

---

## Types of Kubernetes Services

### 1. ClusterIP

- **Description**: The default service type. Provides an internal IP within the cluster.
- **Access**: Accessible only inside the cluster.
- **Use Case**: Used for communication between services inside the cluster (e.g., front-end to back-end communication).

![ClusterIP](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/ClusterIP.png?raw=true)

---

### 2. NodePort

- **Description**: Extends **ClusterIP** by exposing the service to the outside world via a static port on each cluster node.
- **Access**: External traffic can reach the service through `<NodeIP>:<NodePort>`.
- **Port Range**: 30000–32767 (default range).
- **Use Case**: For exposing services externally or custom load balancing.

![NodePort](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/NodePort.png?raw=true)

---

### 3. LoadBalancer

- **Description**: Extends **NodePort** to automatically create an external load balancer with a public IP address, provided by a cloud service provider.
- **Access**: Accessible via the cloud provider’s public IP.
- **Use Case**: Used for applications requiring external access with built-in load balancing.

![LoadBalancer](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/LoadBalancer.png?raw=true)

---

## Ingress in Kubernetes

### What is Ingress?

In Kubernetes, **Ingress** is an API object that controls external access to services. It simplifies routing by providing a single entry point to access multiple services inside the cluster.

### Why is Ingress Needed?

1. **Manage Traffic Easily**: Simplifies routing by consolidating multiple services under a single entry point.
2. **URL-based Routing**: Routes traffic based on URL paths (e.g., `/service1` to Service 1, `/service2` to Service 2).
3. **SSL/TLS (HTTPS) Support**: Manages HTTPS traffic and certificates for secure communication.
4. **Load Balancing**: Distributes traffic across multiple pods to ensure high availability.
5. **Security**: Supports authentication, IP blocking, rate limiting, and more.
6. **Cost Reduction**: Minimizes the need for multiple load balancers, reducing infrastructure costs.

---

## Ingress vs. Ingress Controller

### 1. **Ingress**

- **Definition**: An API object defining how external traffic should be routed to services within the cluster.
- **Function**: Defines routing rules based on URL paths, hostnames, and more.

### 2. **Ingress Controller**

- **Definition**: A software component that implements the routing logic defined by Ingress.
- **Function**: It listens for incoming HTTP/HTTPS requests and directs them to the appropriate services based on the Ingress rules.

---

## Conclusion

Kubernetes provides powerful tools like **Pods**, **Deployments**, **Services**, and **Ingress** to manage and scale containerized applications. Understanding these concepts is crucial to deploying, updating, and securing applications effectively in a Kubernetes cluster.
