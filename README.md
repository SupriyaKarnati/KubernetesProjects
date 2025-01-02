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

# Kubernetes: Deployment vs ReplicaSet

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

# Kubernetes Service Types

This document explains the different types of Kubernetes services, their usage, and how they differ from one another.

## 1. ClusterIP

### Description:
- **ClusterIP** is the default service type in Kubernetes.
- It assigns a **private IP address** to the service, which is **only accessible within the Kubernetes cluster**.

### Access:
- Only other services inside the same cluster can access this service.

### Use Cases:
- Communication between different parts of your application within the same cluster.
- Example: Front-end service talking to back-end service.

### Image Example:
![ClusterIP](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/ClusterIP.png?raw=true)

---

## 2. NodePort

### Description:
- **NodePort** is an extension of the **ClusterIP** service type.
- It exposes the service to the **outside world** by opening a specific port on each **node** in the cluster.
- You can access the service from outside the cluster using `<NodeIP>:<NodePort>`.

### Access:
- External traffic can reach your service by connecting to a node's IP and the assigned port.

### Port Range:
- The NodePort port range is **30000-32767**. Kubernetes will automatically assign a port, but you can also manually choose a port within this range.

### Use Cases:
- When you want to expose your service outside the cluster.
- Useful for custom load balancing or environments not fully supported by Kubernetes.

### Image Example:
![NodePort](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/NodePort.png?raw=true)

---

## 3. LoadBalancer

### Description:
- **LoadBalancer** is an extension of the **NodePort** service type.
- It integrates with cloud providers (like AWS, GCP, Azure) to create an external **load balancer** for your service.
- A cloud provider will automatically set up the load balancer and assign it a public IP address.

### Access:
- The load balancer automatically distributes traffic to the backend Pods of your service, and you can access the service via a cloud-provided IP.

### Use Cases:
- When you are using a cloud provider to host your Kubernetes cluster.
- Ideal for applications requiring external access with automatic load balancing.

### Image Example:
![LoadBalancer](https://github.com/SupriyaKarnati/KubernetesProjects/blob/main/LoadBalancer.png?raw=true)

---

## Summary

- **ClusterIP**: Used for private communication within the cluster.
- **NodePort**: Exposes services to the outside world using a static port on each node.
- **LoadBalancer**: Exposes services externally with a cloud-based load balancer for automatic traffic distribution.

---

Feel free to refer to this document for a better understanding of Kubernetes service types!
